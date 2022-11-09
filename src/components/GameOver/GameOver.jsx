import React from "react";
import classes from "./GameOver.module.css";
import { Button } from "../Button/Button";

export const GameOver = (props) => {
  const { gameOver, resetBoardFunc } = props;

  return (
    <div
      style={{ display: gameOver ? "block" : "none" }}
      className={classes.on_top}
    >
      <div className={classes.header}>
        <h1>Game Over</h1>
        <Button
          style={{
            backgroundColor: "black",
            paddingInline: "10%",
            paddingBlock: "3%",
          }}
          onClick={resetBoardFunc}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
