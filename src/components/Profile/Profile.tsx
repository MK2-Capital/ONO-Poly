import { Container, Description } from "./Profile.styles";
import Image from "next/image";
import game from "../../../public/assets/game/game.gif";

function Profile() {
  return (
    <Container>
      <Image src={game} height={300} width={300} />

      <Description>
        ONO is a free metaverse claw machine game where players earn $ONO tokens
        by completing daily challenges and competitions, then use the $ONO
        tokens to play and win NFTs from Resellers, who benefit more compared to
        reselling NFTs on traditional marketplaces. Resellers earn $MKG tokens
        by listing any NFTs ranging from emerging to blue-chip collections and
        earn $ONO/$MKG when the NFTs are won/sold to the winning player.
      </Description>
    </Container>
  );
}

export default Profile;
