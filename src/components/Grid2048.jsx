import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import GridItem from "./GridItem";
import {
  getRandomCoords,
  randomId,
  getRandomNum,
  equals,
} from "../helpers/common";
import { theme } from "./Palette";
import { deepCopy } from "../helpers/common";

const useStyles = makeStyles({
  box: {
    width: "100%",
    maxWidth: "80vh",
    paddingBottom: "min(100%, 80vh - 35px)",
    marginTop: "10px",
    marginBottom: "10px",
    position: "relative",
    border: "0.5vw solid ".concat(theme.palette.secondary.main),
    background: theme.palette.secondary.main,
    borderRadius: "3%",
  },
});

export const createInitialItems = () => {
  var initialItems = {};
  const setInitialItems = (someItems) => (initialItems = someItems);

  for (var i = 0; i < 2; i++) {
    addRandomItem(initialItems, setInitialItems);
  }

  return initialItems;
};

const isSpaceTaken = (coords, items) => {
  for (var item of items) {
    if (coords[0] === item[0] && coords[1] === item[1]) {
      return true;
    }
  }
  return false;
};

const addRandomItem = (items, setItems) => {
  let coords;
  do {
    coords = getRandomCoords();
  } while (isSpaceTaken(coords, Object.values(items)));

  setItems({ ...items, [randomId()]: [...coords, getRandomNum()] });
};

const addDeadItem = (deadItems, setDeadItems, itemId, itemPos) => {
  setDeadItems({ ...deadItems, [itemId]: itemPos });
};

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
  } = states;
  for (var [id, item] of Object.entries(items)) {
    addDeadItem(deadItems, setDeadItems, id, [item[0], item[1]]);
  }
  if (highScore < score) {
    setHighScore(score);
  }

  // Set previous state
  setPreviousItems(items);
  setPreviousScore(score);

  setScore(0);
  setItems(createInitialItems());
};

export const undo = (states) => {
  const { setItems, setScore, previousItems, previousScore } = states;
  setScore(previousScore);
  setItems(previousItems);
};

export const shift = (direction, states) => {
  const {
    items,
    setItems,
    score,
    setScore,
    deadItems,
    setDeadItems,
    setPreviousItems,
    setPreviousScore,
  } = states;

  const lines = [[], [], [], []];
  const coordIndex = ["left", "right"].includes(direction) ? 0 : 1;
  let newScore = score;

  // Create grid of items
  for (var [id, item] of Object.entries(deepCopy(items))) {
    lines[item[1 - coordIndex]].push([id, item]);
  }

  const newItems = {};
  for (var i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Sort line into helpful order
    line.sort((a, b) => a[1][coordIndex] - b[1][coordIndex]);

    // Combine items in line if possible
    for (var k = 1; k < line.length; k++) {
      // If adjacent tile (in direction of shift) has the same value
      if (line[k][1][2] === line[k - 1][1][2]) {
        // Remove item
        line[k][1][2] = line[k][1][2] * 2;
        newScore += line[k][1][2];
        addDeadItem(deadItems, setDeadItems, ...line[k - 1]);
        line.splice(k - 1, 1);
      }
    }

    // Sort line into correct order (if not already)
    if (["right", "down"].includes(direction)) {
      line.reverse();
    }

    // Translate grid indexes to coordinates
    for (var j = 0; j < line.length; j++) {
      const [key, item2] = line[j];

      const newJ = ["right", "down"].includes(direction) ? 3 - j : j;

      newItems[key] = [];
      newItems[key][1 - coordIndex] = i;
      newItems[key][coordIndex] = newJ;
      newItems[key][2] = item2[2];
    }
  }

  // Add item to the grid
  if (!equals(Object.values(newItems), Object.values(items))) {
    // Set previous state
    setPreviousItems(items);
    setPreviousScore(score);

    setScore(newScore);

    setTimeout(() => {
      addRandomItem(newItems, setItems);
    }, 1);
  }
};

const createInitialBlankItems = () => {
  const blankItems = {};
  for (var i = 0; i < 16; i++) {
    blankItems[randomId()] = [i % 4, Math.floor(i / 4), 0];
  }
  return blankItems;
};

const Grid2048 = (props) => {
  const classes = useStyles();
  const { items, deadItems, setDeadItems } = props;
  const [blankItems] = useState(createInitialBlankItems());

  return (
    <div style={{ width: "100%" }}>
      <div className={classes.box} onAnimationEnd={addRandomItem}>
        {Object.keys(blankItems).map((id) => (
          <GridItem items={blankItems} type="blank" key={id} id={id} />
        ))}
        {Object.keys(deadItems).map((id) => (
          <GridItem
            items={deadItems}
            key={id}
            id={id}
            type="dead"
            deadItems={deadItems}
            setDeadItems={setDeadItems}
          />
        ))}
        {Object.keys(items).map((id) => (
          <GridItem items={items} key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

export default Grid2048;
