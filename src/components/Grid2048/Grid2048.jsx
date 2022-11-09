import React, { useEffect, useMemo, useState } from "react";
import { addRandomItem, createInitialBlankItems, isGameOver } from ".";
import GridItem from "../GridItem";
import classes from "./Grid2048.module.css";

export const Grid2048 = (props) => {
  const { items, setGameOver, deadItems, setDeadItems } = props;
  const [blankItems] = useState(createInitialBlankItems());

  const gridItems = useMemo(() => {
    return {
      ...Object.keys(items).reduce((acc, id) => {
        acc[id] = "number";
        return acc;
      }, {}),
      ...Object.keys(deadItems).reduce((acc, id) => {
        acc[id] = "dead";
        return acc;
      }, {}),
    };
  }, [deadItems, items]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDeadItems((currentDeadItems) => {
        for (let id of Object.keys(deadItems)) delete currentDeadItems[id];
        return currentDeadItems;
      });
    }, 5);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (isGameOver(items)) {
      setTimeout(() => {
        setGameOver(true);
      }, 400);
    }
  }, [items, setGameOver]);

  return (
    <div className={classes.container}>
      <div className={classes.box} onAnimationEnd={addRandomItem}>
        {Object.keys(blankItems).map((id) => (
          <GridItem items={blankItems} type="blank" key={id} id={id} />
        ))}
        {Object.entries(gridItems).map(([id, type]) => {
          return (
            <GridItem
              items={type === "number" ? items : deadItems}
              key={id}
              id={id}
              type={type}
            />
          );
        })}
      </div>
    </div>
  );
};
