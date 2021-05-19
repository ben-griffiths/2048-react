import { Button, CircularProgress } from "@material-ui/core";
import { Refresh, Undo } from "@material-ui/icons";
import classNames from "classnames";
import React from "react";
import classes from "./Header.module.css";

const ScoreBox = (props) => {
  const { title, score } = props;
  return (
    <div className={classes.box}>
      <h3 className={classNames(classes.font_size_1_5vw, classes.zero_margin)}>
        {title}
      </h3>
      {score > -1 ? (
        <h2
          className={classNames(classes.font_size_2_5vw, classes.zero_margin)}
        >
          {score}
        </h2>
      ) : (
        <CircularProgress className={classes.font_size_2_5vw} />
      )}
    </div>
  );
};

export const Header = (props) => {
  const { score, resetBoardFunc, highScore, undoFunc } = props;
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1 className={classes.main_header}>2048-React</h1>
        <ScoreBox title="Score" score={score} />
        <ScoreBox title="Highscore" score={highScore} />
      </div>
      <div className={classes.actionBar}>
        <Button variant="contained" color="secondary" onClick={undoFunc}>
          <Undo className={classes.colour_white} />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={resetBoardFunc}
          className={classes.refresh_button}
        >
          <Refresh className={classes.colour_white} />
        </Button>
      </div>
    </div>
  );
};
