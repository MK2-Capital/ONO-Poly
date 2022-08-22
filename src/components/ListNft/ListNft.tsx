import SingleNft from "@components/SingleNft/SingleNft";
import { Container, NftContainer, Title } from "./ListNft.styles";

function ListNFT(props: any) {
  let NFTs = props.nfts;
  let Count = props.count;

  console.log("props", props.nfts);
  if (NFTs != null) {
    return (
      <Container>
        <Title>My NFT LIST : {Count}</Title>

        <NftContainer>
          {Object.values(NFTs).map((nft, i) => (
            <SingleNft nft={nft} key={i} />
          ))}
        </NftContainer>
      </Container>
    );
  } else {
    return <div>Nothing to show ...</div>;
  }
}

export default ListNFT;
