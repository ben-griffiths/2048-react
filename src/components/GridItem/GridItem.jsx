import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import classes, { tileColour } from "./GridItem.module.css";

const toPercentage = (num) => num.toString().concat("%");

export const GridItem = (props) => {
  const { items, id, type, deadItems, setDeadItems } = props;
  const [bgcolor, setBgColor] = useState(null);

  useEffect(() => {
    let colTimeOut;
    switch (type) {
      case "dead":
        setBgColor("red");
        setTimeout(() => {
          const temp = { ...deadItems };
          delete temp[id];
          setDeadItems(temp);
        }, 100);
        break;
      case "blank":
        setBgColor(tileColour);
        break;
      default:
        setBgColor("blue");
        colTimeOut = setTimeout(() => {
          setBgColor("white");
        }, 100);
        break;
    }
    return () => {
      clearTimeout(colTimeOut);
    };
  }, [type, deadItems, id, setBgColor, setDeadItems]);

  var [x, y, val] = items[id];

  var left = toPercentage(x * 25);
  var top = toPercentage(y * 25);

  return (
    <Box bgcolor={bgcolor} className={classes.box} style={{ top, left }}>
      {type === "blank" ? null : <h1 className={classes.text}> {val} </h1>}
    </Box>
  );
};
