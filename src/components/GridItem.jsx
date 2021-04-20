import { Box, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import classNames from "classnames";

const useStyles = makeStyles({
  box: {
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "calc(25% - 16px)",
    height: "calc(25% - 16px)",
    margin: "8px",
    borderRadius: "16px",
    transition: "all 100ms linear",
  },
});

const toPercentage = (num) => num.toString().concat("%");

const GridItem = (props) => {
  const classes = useStyles();
  const { items, id, dead, deadItems, setDeadItems } = props;
  const [bgcolor, setBgColor] = useState(dead ? "red" : "blue");

  useEffect(() => {
    let colTimeOut;
    if (dead) {
      setTimeout(() => {
        const temp = { ...deadItems };
        delete temp[id];
        setDeadItems(temp);
      }, 100);
    } else {
      colTimeOut = setTimeout(() => {
        setBgColor("white");
      }, 100);
    }
    return () => {
      clearTimeout(colTimeOut);
    };
  }, [dead, deadItems, id, setBgColor, setDeadItems]);

  var [x, y, val] = items[id];

  var left = toPercentage(x * 25);
  var top = toPercentage(y * 25);

  return (
    <Box
      bgcolor={bgcolor}
      className={classNames(classes.box, classes.fadeIn)}
      style={{ top, left }}
    >
      <h1> {val} </h1>
    </Box>
  );
};

export default GridItem;
