import React, { useEffect, useState } from "react";
import { addRandomItem, createInitialBlankItems, isGameOver } from ".";
import GridItem from "../GridItem";
import classes from "./Grid2048.module.css";

export const Grid2048 = (props) => {
  const { items, setGameOver } = props;
  const [blankItems] = useState(createInitialBlankItems());

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
        {Object.keys(items).map((id) => (
          <GridItem items={items} key={id} id={id} type="number" />
        ))}
      </div>
    </div>
  );
};
