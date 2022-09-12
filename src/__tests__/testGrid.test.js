import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const findSum = () => {
  const items = screen.queryAllByTestId("grid-item-number");
  return items.reduce((acc, item) => {
    return acc + parseInt(item.textContent);
  }, 0);
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
  }
);
