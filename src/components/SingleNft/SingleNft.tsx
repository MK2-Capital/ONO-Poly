import { walletChainId } from "src/utils/Web3Portal";
import {
  Card,
  Image,
  Name,
  Description,
  ButtonContainer,
  OpenseaButton,
} from "./SingleNft.styles";

function SingleNft(props: any) {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const index = props.i;
  const theNFT = props.nft;

  console.log("test,", theNFT);

  const name = theNFT["title"];
  const imgSrc = theNFT.rawMetadata.image;
  const description = theNFT["description"];
  const address = theNFT["contract"]["address"];
  const tokenId = theNFT["tokenId"];

  const openSeaUrl = () => {
    if (walletChainId == 137) {
      return "https://opensea.io/assets/matic/" + address;
    } else {
      return (
        "https://opensea.io/assets/mumbai/" +
        String(address) +
        "/" +
        String(tokenId)
      );
    }
  };

  const isIpfs = (imgSrc: string) => {
    if (imgSrc.startsWith("ipfs://")) {
      console.log("https://ipfs.io/ipfs/" + imgSrc.slice(6));

      return "https://ipfs.io/ipfs" + imgSrc.slice(6);
    } else return imgSrc;
  };

  return (
    <Card>
      <Image src={isIpfs(imgSrc)} alt={name} />

      <Name> {name}</Name>

      <Description> {description} </Description>

      <OpenseaButton
        onClick={() => {
          window.open(openSeaUrl(), "_blank");
        }}
      >
        See on OpenSea
      </OpenseaButton>
      {/* <Button colorScheme="gray" variant="solid" onClick={onOpen}>
          Deposit the NFT
        </Button> */}
    </Card>
  );
}

export default SingleNft;
