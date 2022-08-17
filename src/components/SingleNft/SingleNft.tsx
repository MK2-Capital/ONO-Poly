import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Card } from "./SingleNft.styles";

function SingleNft(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const index = props.i;
  const theNFT = props.nft;
  const imgSrc =
    "https://opensea.mypinata.cloud/ipfs/" +
    theNFT["media"][0]["gateway"].split("ipfs/")[1];
  const name = theNFT["title"];
  const description = theNFT["description"];
  const address = theNFT["contract"]["address"];
  const tokenId = theNFT["tokenId"];

  const openSeaUrl =
    "https://testnets.opensea.io/assets/mumbai/" +
    String(address) +
    "/" +
    String(tokenId);

  // console.log(imgSrc.split("ipfs/")[1])

  return (
    <Card>
      <img src={imgSrc} alt={name} />
      <div>Name: {name}</div>
      {/*<div>Description: {description}</div>*/}
      <div>
        <Button
          colorScheme="gray"
          variant="solid"
          onClick={() => {
            window.open(openSeaUrl, "_blank");
          }}
        >
          See on OpenSea
        </Button>
        <Button colorScheme="gray" variant="solid" onClick={onOpen}>
          Deposit the NFT
        </Button>
      </div>
      <div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              You are about to deposit {name}, Not implemented yet
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button variant="ghost">Confirm</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </Card>
  );
}

export default SingleNft;
