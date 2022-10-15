import {
  deepCopy,
  equals,
  getRandomCoords,
  getRandomNum,
  randomId,
  range,
} from "../../helpers/common";

const createGrid = (items, invertAxis = false) => {
  const lines = [[], [], [], []];
  for (let [id, item] of Object.entries(deepCopy(items))) {
    lines[item[invertAxis ? 0 : 1]].push([id, item]);
  }
  for (let i = 0; i < 4; i++) {
    lines[i].sort(
      (a, b) => a[1][invertAxis ? 1 : 0] - b[1][invertAxis ? 1 : 0]
    );
  }
  return lines;
};

const isSpaceTaken = (coords, items) => {
  for (var item of items) {
    if (coords[0] === item[0] && coords[1] === item[1]) {
      return true;
    }
  }
  return false;
};

export const createInitialItems = (initialCoords) => {
  if (initialCoords)
    return initialCoords.reduce((acc, coord) => {
      acc[randomId()] = coord;
      return acc;
    }, {});

  var initialItems = {};
  const setInitialItems = (someItems) => (initialItems = someItems);

  for (var i = 0; i < 2; i++) {
    addRandomItem(initialItems, setInitialItems);
  }

  return initialItems;
};

export const addRandomItem = (items, setItems) => {
  let coords;
  do {
    coords = getRandomCoords();
  } while (isSpaceTaken(coords, Object.values(items)));

  setItems({ ...items, [randomId()]: [...coords, getRandomNum()] });
};

export const shift = (direction, states) => {
  const {
    items,
    setItems,
    score,
    setScore,
    setPreviousItems,
    setPreviousScore,
  } = states;
  const newItems = deepCopy(items);
  let newScore = 0;

  for (let i = 0; i < 4; i++) {
    let missing_count = 0;
    for (let f = 0; f < 4; f++) {
      const j = ["right", "down"].includes(direction) ? 3 - f : f;

      let key;
      if (["left", "right"].includes(direction)) {
        key = Object.keys(newItems).find(
          (k) => newItems[k][0] === j && newItems[k][1] === i
        );
      } else {
        key = Object.keys(newItems).find(
          (k) => newItems[k][0] === i && newItems[k][1] === j
        );
      }

      if (key) {
        let adjKey;
        if (direction === "left") {
          adjKey = Object.keys(newItems).find(
            (k) =>
              newItems[k][0] === j - 1 - missing_count &&
              newItems[k][1] === i &&
              newItems[k][2] === newItems[key][2]
          );
        } else if (direction === "right") {
          adjKey = Object.keys(newItems).find(
            (k) =>
              newItems[k][0] === j + 1 + missing_count &&
              newItems[k][1] === i &&
              newItems[k][2] === newItems[key][2]
          );
        } else if (direction === "up") {
          adjKey = Object.keys(newItems).find(
            (k) =>
              newItems[k][0] === i &&
              newItems[k][1] === j - 1 - missing_count &&
              newItems[k][2] === newItems[key][2]
          );
        } else if (direction === "down") {
          adjKey = Object.keys(newItems).find(
            (k) =>
              newItems[k][0] === i &&
              newItems[k][1] === j + 1 + missing_count &&
              newItems[k][2] === newItems[key][2]
          );
        }

        if (adjKey) {
          newItems[adjKey][2] += newItems[key][2];
          newScore += newItems[key][2];
          delete newItems[key];
          missing_count++;
        } else {
          if (direction === "left") {
            newItems[key][0] -= missing_count;
          } else if (direction === "right") {
            newItems[key][0] += missing_count;
          } else if (direction === "up") {
            newItems[key][1] -= missing_count;
          } else if (direction === "down") {
            newItems[key][1] += missing_count;
          }
        }
      } else {
        missing_count++;
      }
    }
  }
  // Add item to the grid
  if (!equals(Object.values(newItems), Object.values(items))) {
    // Set previous state
    setPreviousItems(items);
    setPreviousScore(score);

    setScore(newScore);

    addRandomItem(newItems, setItems);
  }
};

export const createInitialBlankItems = () => {
  const blankItems = {};
  for (var i = 0; i < 16; i++) {
    blankItems[randomId()] = [i % 4, Math.floor(i / 4), 0];
  }
  return blankItems;
};

export const isGameOver = (items) => {
  const lines = createGrid(items, true);
  for (const line of lines) {
    if (line.length < 4) {
      return false;
    }
  }

  for (var item of Object.values(items)) {
    var [x, y, val] = item;
    var adjacentCoords = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];
    for (var [nx, ny] of adjacentCoords) {
      if (range(4).includes(nx) && range(4).includes(ny)) {
        var nval = lines[nx][ny][1][2];
        if (nval === val) {
          return false;
        }
      }
    }
  }
  return true;
};
