import React, { useEffect, useMemo, useRef, useState } from "react";
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
import Modal from "./components/Modal";
import { randomName } from "./helpers/common";
import LeaderBoard from "./components/Leaderboard";

function App({ initialCoords }) {
  const [items, setItems] = useState(createInitialItems(initialCoords));
  const [deadItems, setDeadItems] = useState({});
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [previousItems, setPreviousItems] = useState(items);
  const [previousScore, setPreviousScore] = useState(score);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [username, setUsername] = useState(randomName());
  const [openLeaderboard, setOpenLeaderboard] = useState(false);

  useEffect(() => {
    if (!timer) {
      setInterval(() => {
        setTimer(new Date());
      }, 5000);
    }
  }, [timer, setTimer]);

  const states = useMemo(
    () => ({
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
      setUsername,
      setGameOver,
      setLeaderboard,
      initialCoords,
      deadItems,
      setDeadItems,
      openLeaderboard,
    }),
    [
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
      setUsername,
      setGameOver,
      setLeaderboard,
      initialCoords,
      deadItems,
      setDeadItems,
      openLeaderboard,
    ]
  );

  useEffect(() => {
    const onPageLoad = () => {
      resetBoard(states);
    };
    window.addEventListener("load", onPageLoad);
    return () => window.removeEventListener("load", onPageLoad);
  }, [states]);

  const undoFunc = () => {
    undo(states);
    setGameOver(false);
  };

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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

  let xDown = null;
  let yDown = null;

  function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
  }

  function handleTouchStart(event) {
    const firstTouch = getTouches(event)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        shift("left", states);
      } else {
        shift("right", states);
      }
    } else {
      if (yDiff > 0) {
        shift("up", states);
      } else {
        shift("down", states);
      }
    }
    xDown = null;
    yDown = null;
  }

  return (
    <div
      ref={inputRef}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      tabIndex={-1}
      className="body"
      data-testid="capture"
    >
      <GameOver
        gameOver={gameOver}
        setGameOver={setGameOver}
        resetBoardFunc={() => resetBoard(states)}
        undoFunc={undoFunc}
      />
      <div className="side-padding">
        <div className="container">
          <Header
            score={score}
            highScore={highScore}
            resetBoardFunc={() => resetBoard(states)}
            undoFunc={undoFunc}
            setOpenLeaderboard={setOpenLeaderboard}
          />
          <Grid2048
            items={items}
            deadItems={deadItems}
            setDeadItems={setDeadItems}
            setGameOver={setGameOver}
          />
        </div>
        <Sidebar>
          <LeaderBoard
            leaderboard={leaderboard}
            username={username}
            setUsername={setUsername}
          />
        </Sidebar>
      </div>
      <Modal open={openLeaderboard} onClose={() => setOpenLeaderboard(false)}>
        <LeaderBoard
          leaderboard={leaderboard}
          username={username}
          setUsername={setUsername}
        />
      </Modal>
    </div>
  );
}

export default App;
