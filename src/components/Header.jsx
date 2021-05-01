import { makeStyles, Button, CircularProgress } from "@material-ui/core";
import React from "react";
import { Refresh, Undo } from "@material-ui/icons";

const useStyles = makeStyles({
  container: { display: "flex", flexDirection: "column", width: "100%" },
  header: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    margin: "10px",
  },
  actionBar: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
  },
  box: {
    marginLeft: "10px",
    padding: "12px",
    background: "grey",
    borderRadius: "10px",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});

const ScoreBox = (props) => {
  const classes = useStyles();
  const { title, score } = props;
  return (
    <div className={classes.box}>
      <h3 style={{ fontSize: "1.5vw", margin: "0" }}>{title}</h3>
      {score > -1 ? (
        <h2 style={{ fontSize: "2.5vw", margin: "0" }}>{score}</h2>
      ) : (
        <CircularProgress size="2.5vw" />
      )}
    </div>
  );
};

const Header = (props) => {
  const { score, resetBoardFunc, highScore, undoFunc } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1 style={{ margin: "0 auto 0 0", fontSize: "min(6vw, 60px)" }}>
          2048-React
        </h1>
        <ScoreBox title="Score" score={score} />
        <ScoreBox title="Highscore" score={highScore} />
      </div>
      <div className={classes.actionBar}>
        <Button variant="contained" color="secondary" onClick={undoFunc}>
          <Undo style={{ color: "white" }} />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={resetBoardFunc}
          style={{ marginLeft: "10px" }}
        >
          <Refresh style={{ color: "white" }} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
