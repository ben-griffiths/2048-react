import { makeStyles } from "@material-ui/core";
import React from "react";
import GridItem from "./GridItem";
import {
  getRandomCoords,
  randomId,
  getRandomNum,
  equals,
  range,
} from "../helpers/common";
import { theme } from "./Palette";
import BlankItem from "./BlankItem";

const useStyles = makeStyles({
  box: {
    width: "100%",
    maxWidth: "80vh",
    paddingBottom: "min(100%, 80vh)",
    margin: "50px 10px 10px 10px",
    position: "relative",
    border: "8px solid ".concat(theme.palette.secondary.main),
    background: theme.palette.secondary.main,
    borderRadius: "16px",
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

export const shift = (
  direction,
  items,
  setItems,
  score,
  setScore,
  deadItems,
  setDeadItems
) => {
  const lines = [[], [], [], []];
  const coordIndex = ["left", "right"].includes(direction) ? 0 : 1;

  // Create grid of items
  for (var [id, item] of Object.entries(items)) {
    lines[item[1 - coordIndex]].push([id, item]);
  }

  const newItems = {};
  for (var i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Sort line into helpful order
    line.sort((a, b) => a[1][coordIndex] - b[1][coordIndex]);

    // Combine items in line if possible
    for (var k = 1; k < line.length; k++) {
      if (line[k][1][2] === line[k - 1][1][2]) {
        line[k][1][2] = line[k][1][2] * 2;
        setScore(score + line[k][1][2]);
        setDeadItems({ ...deadItems, [line[k - 1][0]]: line[k - 1][1] });
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
  setItems(newItems);

  // Add item to the grid
  if (!equals(Object.values(newItems), Object.values(items))) {
    setTimeout(() => {
      addRandomItem(newItems, setItems);
    }, 1);
  }
};

const Grid2048 = (props) => {
  const classes = useStyles();
  const { items, deadItems, setDeadItems } = props;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className={classes.box} onAnimationEnd={addRandomItem}>
        {range(16).map((i) => (
          <BlankItem x={i % 4} y={Math.floor(i / 4)} key={i} />
        ))}
        {Object.keys(deadItems).map((id) => (
          <GridItem
            items={deadItems}
            key={id}
            id={id}
            dead={true}
            deadItems={deadItems}
            setDeadItems={setDeadItems}
          />
        ))}
        {Object.keys(items).map((id) => (
          <GridItem items={items} key={id} id={id} dead={false} />
        ))}
      </div>
    </div>
  );
};

export default Grid2048;
