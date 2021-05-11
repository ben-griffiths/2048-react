import {
  adjectives,
  animals,
  colors,
  names,
  NumberDictionary,
  starWars,
  uniqueNamesGenerator,
} from "unique-names-generator";

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

export const randomChoice = (list) => list[randomInt(list.length)];

export const KEY_BINDINGS = {
  KEY_LEFT: 37,
  KEY_UP: 38,
  KEY_RIGHT: 39,
  KEY_DOWN: 40,
};

export const deepCopy = (object) => JSON.parse(JSON.stringify(object));

export const randomName = () => {
  const dictionaryList = [animals, starWars, names];

  const adjectiveList = [[], [adjectives], [colors]];

  const numberDictionary = NumberDictionary.generate({ min: 100, max: 999 });

  const dictionaries = [
    ...randomChoice(adjectiveList),
    randomChoice(dictionaryList),
    numberDictionary,
  ];
  return uniqueNamesGenerator({
    dictionaries,
    separator: "",
    style: "capital",
  }).replace(/ /g, "");
};
