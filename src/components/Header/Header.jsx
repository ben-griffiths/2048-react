import classNames from "classnames";
import React from "react";
import { Button } from "../Button/Button";
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
        <div className={classes.font_size_2_5vw} />
      )}
    </div>
  );
};

export const Header = (props) => {
  const { score, resetBoardFunc, highScore, undoFunc, setOpenLeaderboard } =
    props;
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1 className={classes.main_header}>2048-React</h1>
        <div className={classes.info}>
          <ScoreBox title="Score" score={score} />
          <ScoreBox title="Highscore" score={highScore} />
          <div className={classes.leaderboard_button}>
            <Button onClick={() => setOpenLeaderboard(true)}>
              Leaderboard
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.actionBar}>
        <Button onClick={undoFunc}>Undo</Button>
        <Button onClick={resetBoardFunc}>Reset</Button>
      </div>
    </div>
  );
};
