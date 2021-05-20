import { addDeadItem, createInitialItems } from ".";
import { getGist, updateGist } from "../../helpers/gist";

export const resetBoard = (states) => {
  const {
    items,
    setItems,
    score,
    setScore,
    deadItems,
    setDeadItems,
    highScore,
    setHighScore,
    setPreviousItems,
    setPreviousScore,
    username,
    setGameOver,
  } = states;
  for (var [id, item] of Object.entries(items)) {
    addDeadItem(deadItems, setDeadItems, id, [item[0], item[1]]);
  }

  getGist().then((resp) => {
    const leaderboard = JSON.parse(resp.data.files["Leaderboard.json"].content);

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

    updateGist({ files }).then((resp) => console.log(resp.data));

    // Set previous state
    setGameOver(false);
    setPreviousItems(items);
    setPreviousScore(score);

    setScore(0);
    setItems(createInitialItems());
  });
};

export const undo = (states) => {
  const { setItems, setScore, previousItems, previousScore } = states;
  setScore(previousScore);
  setItems(previousItems);
};
