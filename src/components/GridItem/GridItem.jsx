import React, { useEffect } from "react";
import classes from "./GridItem.module.css";

const toPercentage = (num) => num.toString().concat("%");

export const GridItem = (props) => {
  const { items, id, type } = props;

  var [x, y, val] = items[id];

  var left = toPercentage(x * 25);
  var top = toPercentage(y * 25);

  return (
    <div data-testid={`grid-item-${type}`} className={classes.box } style={{ top, left }}>
      {type === "blank" ? null : <h1 className={classes.text}> {val} </h1>}
    </div>
  );
};
