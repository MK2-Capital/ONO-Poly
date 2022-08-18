import SingleNft from "@components/SingleNft/SingleNft";
import { Container, NftContainer } from "./ListNft.styles";

function ListNFT(props: any) {
  let NFTs = props.nfts;
  let Count = props.count;

  console.log("props", props.nfts);
  if (NFTs != null) {
    return (
      <Container>
        <div>My NFT LIST : {Count}</div>

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
