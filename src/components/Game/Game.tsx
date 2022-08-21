import Image from "next/image";
import { Container, NftContainer } from "./Game.styles";
import { play_game, walletAccount } from "src/utils/Web3Portal";
import game from "../../../public/assets/game/game.gif";
function Game(props: any) {
  return (
    <div>
      <Container>
        <Image title="GAME" src={game} />

        <button onClick={() => play_game(walletAccount)}>Play Game</button>
      </Container>
    </div>
  );
}

export default Game;
