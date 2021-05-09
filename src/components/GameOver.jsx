import { Backdrop } from "@material-ui/core";
import React from "react";

const GameOver = (props) => {
  const { gameOver } = props;

  return (
    <Backdrop open={gameOver} style={{ zIndex: 1 }}>
      <h1
        style={{
          color: "white",
          fontSize: "6vw",
          textShadow: "3px 3px #000000",
        }}
      >
        Game Over!
      </h1>
    </Backdrop>
  );
};

export default GameOver;
