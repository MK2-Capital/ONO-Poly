// import SingleNft from "@components/SingleNft/SingleNft";
import { Container } from "./ListNft.styles";

function ListNFT(props: any) {
  let NFTs = props.nfts;
  let Count = props.count;

  if (NFTs != null) {
    return (
      <Container>
        <div>Total NFTs in the account: {Count}</div>
        {/* {Object.values(NFTs).map((nft, i) => (
          // <SingleNft nft={nft} key={i} />
        ))} */}
      </Container>
    );
  } else {
    return <div>Nothing to show ...</div>;
  }
}

export default ListNFT;
