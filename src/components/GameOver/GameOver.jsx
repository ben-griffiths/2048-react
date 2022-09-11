import React from "react";
import classes from "./GameOver.module.css";

export const GameOver = (props) => {
  const { gameOver } = props;

  return (
    <div style={{display: gameOver ? "block" : "none"}} className={classes.on_top}>
      <h1 className={classes.header}>Game Over!</h1>
    </div>
  );
};
