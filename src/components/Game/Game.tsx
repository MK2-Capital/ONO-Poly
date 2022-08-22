import Image from "next/image";
import { Container, GameButton } from "./Game.styles";
import { play_game, walletAccount } from "src/utils/Web3Portal";
import game from "../../../public/assets/game/game.gif";
function Game(props: any) {
  return (
    <Container>
      <Image title="GAME" src={game} width={400} />

      <GameButton onClick={() => play_game(walletAccount)}>
        Play Game
      </GameButton>
    </Container>
  );
}

export default Game;
