import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const findSum = () => {
  const items = screen.queryAllByTestId("grid-item-number");
  return items.reduce((acc, item) => {
    return acc + parseInt(item.textContent);
  }, 0);
};

const getCoords = (element) => {
  const x = parseInt(element.style.left.slice(0, -1)) / 25;
  const y = parseInt(element.style.top.slice(0, -1)) / 25;
  const v = parseInt(element.textContent);
  return [x, y, v];
};

const getAllCoords = () => {
  const items = screen.queryAllByTestId("grid-item-number");
  return items.map(getCoords);
};

test("renders initial grid correctly", async () => {
  render(
    <App
      initialCoords={[
        [0, 0, 2],
        [1, 1, 2],
      ]}
    />
  );

  expect(screen.getAllByTestId("grid-item-number")).toHaveLength(2);
  expect(screen.getAllByTestId("grid-item-blank")).toHaveLength(16);
  expect(findSum()).toBeGreaterThanOrEqual(4);
});

test.each(["right", "left", "up", "down"])(
  "can shift %s correctly",
  async (direction) => {
    render(
      <App
        initialCoords={[
          [0, 0, 2],
          [1, 1, 2],
        ]}
      />
    );
    const sum = findSum();

    await userEvent.keyboard(
      `[Arrow${direction[0].toUpperCase() + direction.substring(1)}]`
    );

    expect(findSum()).toBeGreaterThan(sum);

    const coords = getAllCoords();
    switch (direction) {
      case "right":
        expect(coords).toContainEqual([3, 1, 2]);
        expect(coords).toContainEqual([3, 1, 2]);
        break;
      case "left":
        expect(coords).toContainEqual([0, 0, 2]);
        expect(coords).toContainEqual([0, 1, 2]);
        break;
      case "up":
        expect(coords).toContainEqual([0, 0, 2]);
        expect(coords).toContainEqual([1, 0, 2]);
        break;
      case "down":
        expect(coords).toContainEqual([0, 3, 2]);
        expect(coords).toContainEqual([1, 3, 2]);
        break;
    }
  }
);

test.each(["up", "down", "left", "right"])(
  "can shift %s and combine two tiles",
  async (direction) => {
    render(
      <App
        initialCoords={[
          [0, 0, 2],
          ["up", "down"].includes(direction) ? [0, 1, 2] : [1, 0, 2],
        ]}
      />
    );

    await userEvent.keyboard(
      `[Arrow${direction[0].toUpperCase() + direction.substring(1)}]`
    );

    const coords = getAllCoords();
    switch (direction) {
      case "up":
        expect(coords).toContainEqual([0, 0, 4]);
        break;
      case "down":
        expect(coords).toContainEqual([0, 3, 4]);
        break;
      case "left":
        expect(coords).toContainEqual([0, 0, 4]);
        break;
      case "right":
        expect(coords).toContainEqual([3, 0, 4]);
        break;
    }
  }
);

test.each(["up", "down", "left", "right"])(
  "can shift %s and combine two tiles with 3 tiles in the line",
  async (direction) => {
    render(
      <App
        initialCoords={[
          [0, 0, 2],
          ["up", "down"].includes(direction) ? [0, 1, 2] : [1, 0, 2],
          ["up", "down"].includes(direction) ? [0, 2, 2] : [2, 0, 2],
        ]}
      />
    );

    await userEvent.keyboard(
      `[Arrow${direction[0].toUpperCase() + direction.substring(1)}]`
    );

    const coords = getAllCoords();
    switch (direction) {
      case "up":
        expect(coords).toContainEqual([0, 0, 4]);
        expect(coords).toContainEqual([0, 1, 2]);
        break;
      case "down":
        expect(coords).toContainEqual([0, 3, 4]);
        expect(coords).toContainEqual([0, 2, 2]);
        break;
      case "left":
        expect(coords).toContainEqual([0, 0, 4]);
        expect(coords).toContainEqual([1, 0, 2]);
        break;
      case "right":
        expect(coords).toContainEqual([3, 0, 4]);
        expect(coords).toContainEqual([2, 0, 2]);
        break;
    }
  }
);
