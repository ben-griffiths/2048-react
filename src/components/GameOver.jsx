import { Backdrop, Button, Grid } from "@material-ui/core";
import { Refresh, Undo } from "@material-ui/icons";
import React from "react";

const GameOver = (props) => {
  const { gameOver, setGameOver, undoFunc, resetBoardFunc } = props;

  return (
    <Backdrop open={gameOver} style={{ zIndex: 1 }}>
      <Grid>
        <Grid>
          <h1 style={{ color: "white" }}>Game Over!</h1>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: "10px" }}
            onClick={() => {
              setGameOver(false);
              undoFunc();
            }}
          >
            <Undo style={{ color: "white" }} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: "10px" }}
            onClick={() => {
              setGameOver(false);
              resetBoardFunc();
            }}
          >
            <Refresh style={{ color: "white" }} />
          </Button>
        </Grid>
      </Grid>
    </Backdrop>
  );
};

export default GameOver;
