import { CssBaseline, Grid } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import GameOver from "./components/GameOver";
import Grid2048, {
  createInitialItems,
  resetBoard,
  shift,
  undo,
} from "./components/Grid2048";
import Header from "./components/Header";
import Palette from "./components/Palette";
import Sidebar from "./components/Sidebar";
import { KEY_BINDINGS, randomName } from "./helpers/common";
import { getGist } from "./helpers/gist";

function App() {
  const [items, setItems] = useState(createInitialItems());
  const [score, setScore] = useState(0);
  const [deadItems, setDeadItems] = useState({});
  const [highScore, setHighScore] = useState(-1);
  const [previousItems, setPreviousItems] = useState(items);
  const [previousScore, setPreviousScore] = useState(score);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [username] = useState(randomName());

  useEffect(() => {
    getGist().then((resp) => {
      const newHighScore = parseInt(resp.data.files["Highscore.txt"].content);
      if (newHighScore > highScore) {
        setHighScore(newHighScore);
      }
      const newLeaderboard = JSON.parse(
        resp.data.files["Leaderboard.json"].content
      );
      setLeaderboard(newLeaderboard);
    });
  }, [highScore, timer]);

  useEffect(() => {
    if (!timer) {
      setInterval(() => {
        setTimer(new Date());
      }, 5000);
    }
  }, [timer, setTimer]);

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
    leaderboard,
    username,
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
        <Grid container style={{ paddingLeft: "10px", paddingRight: "10px" }}>
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
          <Grid item xs={4}>
            <Sidebar leaderboard={leaderboard} username={username} />
          </Grid>
        </Grid>
      </Palette>
    </div>
  );
}

export default App;
