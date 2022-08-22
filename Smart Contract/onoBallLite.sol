// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

error NotAdmin();
error NotOwner();
error NotEnoughFund();
error NotApprovedForMarketplace();
error NoSuchPrize();
error PrizeNotAvailableToWithdrawByAddress(uint256 prizeId, address sender);
error PrizeNoLongerAvailable(uint256 prizeId);
error NotEnoughBalance();
error NotEnoughAllowance();
error NotEnoughDeposit(address player, uint256 depositBalance);
error SomeoneElseIsPlaying(uint256 prizeId, uint256 timestamp);

contract OnoBall is IERC721Receiver, ERC721URIStorage {
    
    struct Prize {
        address stakerAddress;
        address nftAddress;
        uint256 tokenId;
        uint256 expectedIncome;
        uint256 totalIncome;
        uint256 winProbability;
        uint256 thePrizeId;
        string status; // stake, unstake, playing, won
    }

    struct PrizeWon {
        address winnerAddress;
        address nftAddress;
        uint256 tokenId;
        uint256 thePrizeId;
        string status; // unclaim, claimed
    }
    
    // Variables
    address payable public vault;
    uint256 public prizeId;
    uint256 public treasurySurplus; // How much token is available for the project official to withdraw
    mapping(uint256 => Prize) public prizeList; // prizeId to Prize
    mapping(address => uint256[]) public prizeDepositList; // Depositor add. to prizeId[]
    mapping(uint256 => PrizeWon) public prizeWonList; // prizeId to PrizeWon
    mapping(address => uint256[]) public prizeWinnerList; // winner address to prizeId[]
    mapping(address => uint256) public prizDepositCount;
    mapping(address => uint256) public prizeWonCount;

    address private admin;

    // For prototype and testing purpose
    using Counters for Counters.Counter; 
    Counters.Counter private _tokenIds;

    // Events
    event AdminChanged(address _address);
    event TreasuryWithdraw(uint256 _amount, uint256 treasurySurplus);
    event UserWithdraw(uint256 _amount, address userAddress);
    event PrizeAdd(uint256 _prizeId, Prize _prizeInfo);
    event PrizeRemove(uint256 _prizeId);
    event GameLost(address _player, uint256 _tokenInserted, uint256 _prizeId);
    event GameWon(address _player, uint256 _tokenInserted, uint256 _prizeId);
    event PrizeClaimed(address _claimerAddress, address _nftAddress, uint256 _tokenId);

    // Constructor
    constructor() ERC721("ONOBALL_Test", "OBT") {
        admin = msg.sender;
        vault = payable(address(this));
        prizeId = 0;
    }

    // Function modifiers
    modifier isAdmin() {
        if (msg.sender != admin) {
            revert NotAdmin();
        }

        _;
    }

    modifier isEnoughFromTreasury(uint256 _amount) {
        if (_amount > treasurySurplus) {
            revert NotEnoughFund();
        }

        _;
    }

    modifier isOwner(address _nftAddress, uint256 _tokenId, address _sender) {
        address owner = IERC721(_nftAddress).ownerOf(_tokenId);
        if ( _sender != owner ) {
            revert NotOwner();
        }

        _;
    }

    modifier isStakerHolder(uint256 _prizeId, address _sender) {
        if ( (prizeList[_prizeId].stakerAddress != _sender) || !compareStrings(prizeList[_prizeId].status, "stake") ) {
            revert PrizeNotAvailableToWithdrawByAddress(_prizeId, _sender);
        }

        _;
    }

    modifier isThePrizeAvailable(uint256 _prizeId) {
        if ( _prizeId > prizeId ) {
            revert NoSuchPrize();
        }
        
        if ( !compareStrings(prizeList[_prizeId].status, "stake") && !compareStrings(prizeList[_prizeId].status, "playing") ) {
            revert PrizeNoLongerAvailable(_prizeId);
        }

        _;
    }

    modifier isSomeonePlaying(uint256 _prizeId) {
       Prize memory thePrizeInfo = prizeList[_prizeId];
       if ( compareStrings(thePrizeInfo.status, "playing") ) {
           revert SomeoneElseIsPlaying(_prizeId, block.timestamp);
       }
       _;
    }

    // -------------------------------------------
    //           Main Functions
    // -------------------------------------------

    // ------ Prize Providers ------------------

    // Sumbit the NFTs to the game
    function submitNftPrize(address _nftAddress, uint256 _tokenId, uint256 _expectedIncome)
        external
        isOwner(_nftAddress, _tokenId, msg.sender)
    {
        IERC721 nft = IERC721(_nftAddress);
        if (nft.getApproved(_tokenId) != address(this)) {
            revert NotApprovedForMarketplace();
        }

        // Transfer the NFT ownership to the vault
        IERC721(_nftAddress).safeTransferFrom(msg.sender, vault, _tokenId);
        
        // Calculate winning probability per game token inserted
        uint256 theWinProb = _calWinProbability(_expectedIncome);

        // Store the staking information
        prizeId++;
        Prize memory newPrize = Prize(msg.sender, _nftAddress, _tokenId, 
                                      _expectedIncome, 0, theWinProb, prizeId, "stake");
        prizeList[prizeId] = newPrize;

        prizeDepositList[msg.sender].push(prizeId);
        prizDepositCount[msg.sender]++;

        emit PrizeAdd(prizeId, newPrize);
    }

    function removeNftPrize(uint256 _prizeId) 
        external
        isStakerHolder(_prizeId, msg.sender)
    {
        // Update the prize list
        treasurySurplus += prizeList[_prizeId].totalIncome;
        prizeList[_prizeId].totalIncome = 0; // All uncollected income will go to treasury if user unstake
        prizeList[_prizeId].status = "unstake";

        // Transfer the NFT back to the user
        IERC721(prizeList[_prizeId].nftAddress).safeTransferFrom(vault, msg.sender, prizeList[_prizeId].tokenId);

        emit PrizeRemove(_prizeId);
    }

    // Let users withdraw income generated by the NFT that they submitted and has won by some player
    function userWithdrawIncome(uint256 _prizeId) 
        external 
    {
        require(msg.sender == prizeList[_prizeId].stakerAddress, "Only depositor of the prize can withdraw");
        require(prizeList[_prizeId].totalIncome > 0, "Nothing to withdraw");
        require(compareStrings(prizeList[_prizeId].status, "won"), "The prize has not been won");

        uint256 _amount = prizeList[_prizeId].totalIncome;

        bool sent = payable(msg.sender).send(_amount);

        require(sent, "Failed to withdraw");

        if (sent) {
            prizeList[_prizeId].totalIncome = 0;

            emit UserWithdraw(_amount, msg.sender);
        }

        prizeList[_prizeId].totalIncome = 0;
    }

    // ------ Players ------------------
    // Play a centain NFT
    // * _pModifier is ranging from 0 to 1, decimal 18
    function playGame() //(uint256 _prizeId)
        payable
        external
        returns (uint)
        // isThePrizeAvailable(_prizeId)
        // isSomeonePlaying(_prizeId)
    {
        uint256 psudoTokenNum = _randomNum(1999) + 1;
        string memory psudoTokenNumString = Strings.toString(psudoTokenNum);
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(
            newItemId,
            string(abi.encodePacked("https://cdn-api.niftykit.com/reveal/7J2f0sWAD9WWig5xDFwq/", psudoTokenNumString)) 
        );

        return newItemId;
        
        // require(msg.value > 0, "Need to insert a positive amount of token to play");
        
        // // Update the prize info
        // prizeList[_prizeId].status = "playing";

        // // Deduct tokens from the player's deposit and add to the prize income pool
        // prizeList[_prizeId].totalIncome += msg.value;

        // // Determine if the player win
        // uint256 baseProbability = prizeList[_prizeId].winProbability;
        // uint256 probabilityThreshold = (msg.value / 10**18) * baseProbability * (_pModifier / 10**18);
        // uint256 aRandomNum = _randomNum(2**256-1);

        // if ( aRandomNum <= probabilityThreshold || 
        //      prizeList[_prizeId].totalIncome >= (2 * prizeList[_prizeId].expectedIncome - 1)) { // The player won
        //     // Update the prize info
        //     prizeList[_prizeId].status = "won";
        //     // Add PrizeWon to the player
        //     PrizeWon memory thePrizeWon = PrizeWon(msg.sender, 
        //                                            prizeList[_prizeId].nftAddress, 
        //                                            prizeList[_prizeId].tokenId,
        //                                            _prizeId,
        //                                            "unclaim");
        //     prizeWonList[_prizeId] = thePrizeWon;
        //     prizeWinnerList[msg.sender].push(_prizeId);
        //     prizeWonCount[msg.sender]++;

        //     emit GameWon(msg.sender, msg.value, _prizeId);

        // } else { // The player lost
        //     // Update the prize info
        //     prizeList[_prizeId].status = "stake";

        //     emit GameLost(msg.sender, msg.value, _prizeId);
        // }
    }

    // Send the NFT to the winner's wallet
    function claimPrize(uint256 _prizeId) 
        external
    {
        require(msg.sender == prizeWonList[_prizeId].winnerAddress, "Only winner can claim");
        require(compareStrings(prizeWonList[_prizeId].status, "unclaim"), "Already claimed");

        IERC721(
            prizeWonList[_prizeId].nftAddress
        ).safeTransferFrom(
            vault, 
            msg.sender, 
            prizeWonList[_prizeId].tokenId
        );

        emit PrizeClaimed(
            msg.sender, 
            prizeWonList[_prizeId].nftAddress, 
            prizeWonList[_prizeId].tokenId
        );
    }

    // Submit the NFT the user won to the prize list
    function reSubmitPrize(uint256 _prizeId, uint256 _expectedIncome) 
        external 
    {
        require(msg.sender == prizeWonList[_prizeId].winnerAddress, "Only winner can operate");
        require(compareStrings(prizeWonList[_prizeId].status, "unclaim"), "The prize has been claimed");
        require(_expectedIncome > 0, "The expected income need to be positive");

        prizeWonList[_prizeId].status = "claimed";

        // Calculate winning probability per game token inserted
        uint256 theWinProb = _calWinProbability(_expectedIncome);

        // Store the staking information
        prizeId++;
        Prize memory newPrize = Prize(
            msg.sender, 
            prizeWonList[_prizeId].nftAddress, 
            prizeWonList[_prizeId].tokenId, 
            _expectedIncome, 
            0, 
            theWinProb, 
            prizeId, 
            "stake"
        );
        prizeList[prizeId] = newPrize;

        prizeDepositList[msg.sender].push(prizeId);
        prizDepositCount[msg.sender]++;

        emit PrizeAdd(prizeId, newPrize);

        emit PrizeClaimed(
            msg.sender, 
            prizeWonList[_prizeId].nftAddress, 
            prizeWonList[_prizeId].tokenId
        );
    }

    // ------ Admin ------------------
    function withdrawFromTreasury(address payable _addressTo, uint256 _amount)
        external
        isAdmin()
        isEnoughFromTreasury(_amount)
    {
        bool sent = _addressTo.send(_amount);

        require(sent, "Failed to withdraw from treasury");

        if (sent) {
            treasurySurplus -= _amount;

            emit TreasuryWithdraw(_amount, treasurySurplus);
        }
    }

    function changeAdmin(address _address) 
        external
        isAdmin()
    {
        admin = _address;

        emit AdminChanged(_address);
    }

    // -------------------------------------------
    //           Auxiliary Functions
    // -------------------------------------------

    // A naive randome number generator, use chainlink randome number generator later
    // Return a random number range from 0 to _number
    function _randomNum(uint256 _number) internal view returns(uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
        msg.sender))) % _number;        
    }


    // Now only use simple discrete uniform distribution with a = 1, b = _expectedIncome * 2 - 1
    function _calWinProbability(uint256 _expectedIncome) internal pure returns(uint256) {
        uint256 n = _expectedIncome * 2 - 1;
        return (2**256 - 1) / n; 
    }

    // Compare strings
    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    // Convert uint to string
    // function _uint2str(uint _i) internal pure returns (string memory _uintAsString) {
    //     if (_i == 0) {
    //         return "0";
    //     }
    //     uint j = _i;
    //     uint len;
    //     while (j != 0) {
    //         len++;
    //         j /= 10;
    //     }
    //     bytes memory bstr = new bytes(len);
    //     uint k = len - 1;
    //     while (_i != 0) {
    //         bstr[k--] = byte(uint8(48 + _i % 10));
    //         _i /= 10;
    //     }
    //     return string(bstr);
    // }

    //
    function onERC721Received(address operator, address from, uint256 tokenId, bytes memory data)
        override 
        external
        pure 
        returns (bytes4) 
    {
        return IERC721Receiver.onERC721Received.selector;
    }

    //
    
}