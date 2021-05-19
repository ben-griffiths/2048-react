import { Backdrop } from "@material-ui/core";
import React from "react";
import classes from "./GameOver.module.css";

export const GameOver = (props) => {
  const { gameOver } = props;

  return (
    <Backdrop open={gameOver} className={classes.on_top}>
      <h1 className={classes.header}>Game Over!</h1>
    </Backdrop>
  );
};
