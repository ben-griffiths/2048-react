export const randomInt = (max) => Math.floor(Math.random() * max);

export const getRandomCoords = () => [randomInt(4), randomInt(4)];

export const randomId = () => randomInt(1000000);

export const getRandomNum = () => {
  const x = Math.random();
  if (x < 0.9) {
    return 2;
  } else {
    return 4;
  }
};

export const equals = (a, b) => {
  if (a === b) {
    return true;
  } else if (
    a instanceof Array &&
    b instanceof Array &&
    a.length === b.length
  ) {
    return a.every((v, i) => equals(v, b[i]));
  } else {
    return false;
  }
};

export const range = (n) => [...Array(n).keys()];

export const KEY_BINDINGS = {
  KEY_LEFT: 37,
  KEY_UP: 38,
  KEY_RIGHT: 39,
  KEY_DOWN: 40,
};
