import { createInitialItems } from ".";
import { getGist, updateGist } from "../../helpers/gist";

export const resetBoard = async (states) => {
  const {
    items,
    setItems,
    score,
    setScore,
    highScore,
    setHighScore,
    setPreviousItems,
    setPreviousScore,
    username,
    setGameOver,
    initialCoords,
    setLeaderboard,
  } = states;

  const response = await getGist().catch(() => null);

  const leaderboard = response
    ? JSON.parse(response.data.files["Leaderboard.json"].content)
    : [];

  const newLeaderboard = [...leaderboard, { name: username, score: score }]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  let files = {
    "Leaderboard.json": {
      content: JSON.stringify(newLeaderboard),
    },
  };

  if (highScore < score) {
    setHighScore(score);
    files["Highscore.txt"] = { content: score.toString() };
  }

  updateGist({ files })
    .then((resp) => console.log(resp.data))
    .catch((resp) => console.log(resp.data));

  // Set previous state
  setGameOver(false);
  setPreviousItems(items);
  setPreviousScore(score);
  setLeaderboard(newLeaderboard);

  setScore(0);
  setItems(createInitialItems(initialCoords));
};

export const undo = (states) => {
  const { setItems, setScore, previousItems, previousScore } = states;
  setScore(previousScore);
  setItems(previousItems);
};
