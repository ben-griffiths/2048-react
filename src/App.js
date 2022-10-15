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
import Sidebar from "./components/Sidebar";
import { randomName } from "./helpers/common";
import { getGist } from "./helpers/gist";

function App({ initialCoords }) {
  const [items, setItems] = useState(createInitialItems(initialCoords));
  const [score, setScore] = useState(0);
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
    highScore,
    setHighScore,
    previousItems,
    setPreviousItems,
    previousScore,
    setPreviousScore,
    leaderboard,
    username,
    setGameOver,
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
    switch (event.code) {
      case "ArrowLeft":
        shift("left", states);
        break;
      case "ArrowUp":
        shift("up", states);
        break;
      case "ArrowRight":
        shift("right", states);
        break;
      case "ArrowDown":
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
      className="body"
      data-testid="capture"
    >
      <GameOver
        gameOver={gameOver}
        setGameOver={setGameOver}
        resetBoardFunc={resetBoardFunc}
        undoFunc={undoFunc}
      />
      <div className="side-padding">
        <div className="container">
          <Header
            score={score}
            highScore={highScore}
            resetBoardFunc={resetBoardFunc}
            undoFunc={undoFunc}
          />
          <Grid2048 items={items} setGameOver={setGameOver} />
        </div>
        <Sidebar leaderboard={leaderboard} username={username} />
      </div>
    </div>
  );
}

export default App;
