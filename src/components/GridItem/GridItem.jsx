import React, { useEffect } from "react";
import classes from "./GridItem.module.css";

const toPercentage = (num) => num.toString().concat("%");

export const GridItem = (props) => {
  const { items, id, type, deadItems, setDeadItems } = props;

  useEffect(() => {
    if (type === "dead") {
        setTimeout(() => {
          const temp = { ...deadItems };
          delete temp[id];
          setDeadItems(temp);
        }, 100);
    }

  }, [type, deadItems, id, setDeadItems]);

  var [x, y, val] = items[id];

  var left = toPercentage(x * 25);
  var top = toPercentage(y * 25);

  return (
    <div  className={classes.box} style={{ top, left }}>
      {type === "blank" ? null : <h1 className={classes.text}> {val} </h1>}
    </div>
  );
};
