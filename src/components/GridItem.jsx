import { Box, makeStyles } from "@material-ui/core";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { theme } from "./Palette";

const useStyles = makeStyles({
  box: {
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "23%",
    height: "23%",
    margin: "1%",
    borderRadius: "10%",
    transition: "all 100ms linear",
  },
});

const toPercentage = (num) => num.toString().concat("%");

const GridItem = (props) => {
  const classes = useStyles();
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
        setBgColor(theme.palette.quaternary.main);
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
    <Box
      bgcolor={bgcolor}
      className={classNames(classes.box, classes.fadeIn)}
      style={{ top, left }}
    >
      {type === "blank" ? null : <h1 style={{ fontSize: "7vw" }}> {val} </h1>}
    </Box>
  );
};

export default GridItem;
