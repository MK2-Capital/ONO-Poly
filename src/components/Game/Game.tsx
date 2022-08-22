import Image from "next/image";
import React, { useState } from "react";
import ReactPlayer from "react-player";

import { Container, GameButton } from "./Game.styles";
import { play_game, walletAccount } from "src/utils/Web3Portal";
import game from "../../../public/assets/game/game.gif";
function Game(props: any) {
  const [playing, setPlaying] = useState(false);
  return (
    <Container>
      {/* <Image title="GAME" src={game} width={400} /> */}
      <ReactPlayer playing={playing} url={"game.mp4"} />
      <GameButton
        onClick={async () => {
          setPlaying(true);
          await play_game(walletAccount);
          setPlaying(false);
        }}
      >
        Play Game
      </GameButton>
    </Container>
  );
}

export default Game;
