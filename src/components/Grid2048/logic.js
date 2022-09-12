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
  for (var [id, item] of Object.entries(deepCopy(items))) {
    lines[item[invertAxis ? 0 : 1]].push([id, item]);
  }
  for (var i = 0; i < 4; i++) {
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

export const addDeadItem = (deadItems, setDeadItems, itemId, itemPos) => {
  setDeadItems({ ...deadItems, [itemId]: itemPos });
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

  const coordIndex = ["left", "right"].includes(direction) ? 0 : 1;
  let newScore = score;

  // Create grid of items
  const lines = createGrid(items, coordIndex === 1);

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

    // setTimeout(() => {
    addRandomItem(newItems, setItems);
    // }, 1);
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
