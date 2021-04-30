import { CssBaseline, Grid } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Grid2048, {
  createInitialItems,
  shift,
  resetBoard,
  undo,
} from "./components/Grid2048";
import Palette from "./components/Palette";
import Header from "./components/Header";
import GameOver from "./components/GameOver";
import { KEY_BINDINGS } from "./helpers/common";

function App() {
  const [items, setItems] = useState(createInitialItems());
  const [score, setScore] = useState(0);
  const [deadItems, setDeadItems] = useState({});
  const [highScore, setHighScore] = useState(0);
  const [previousItems, setPreviousItems] = useState(items);
  const [previousScore, setPreviousScore] = useState(score);
  const [gameOver, setGameOver] = useState(false);

  const states = {
    items,
    setItems,
    score,
    setScore,
    deadItems,
    setDeadItems,
    highScore,
    setHighScore,
    previousItems,
    setPreviousItems,
    previousScore,
    setPreviousScore,
  };

  const resetBoardFunc = () => {
    resetBoard(states);
  };

  const undoFunc = () => {
    undo(states);
  };

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case KEY_BINDINGS.KEY_LEFT:
        shift("left", states);
        break;
      case KEY_BINDINGS.KEY_UP:
        shift("up", states);
        break;
      case KEY_BINDINGS.KEY_RIGHT:
        shift("right", states);
        break;
      case KEY_BINDINGS.KEY_DOWN:
        shift("down", states);
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={inputRef}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      style={{ height: "100vh" }}
    >
      <Palette>
        <CssBaseline />
        <GameOver
          gameOver={gameOver}
          setGameOver={setGameOver}
          resetBoardFunc={resetBoardFunc}
          undoFunc={undoFunc}
        />
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid container item xs={8}>
            <Header
              score={score}
              highScore={highScore}
              resetBoardFunc={resetBoardFunc}
              undoFunc={undoFunc}
            />
            <Grid2048
              items={items}
              deadItems={deadItems}
              setDeadItems={setDeadItems}
              setGameOver={setGameOver}
            />
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Palette>
    </div>
  );
}

export default App;
