import { Box, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
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

  useEffect(() => {
    if (dead) {
      setTimeout(() => {
        delete deadItems[id];
        setDeadItems(deadItems);
      }, 100);
    }
  });

  var [x, y, val] = items[id];

  var left = toPercentage(x * 25);
  var top = toPercentage(y * 25);

  return (
    <Box
      bgcolor={"white"}
      className={classNames(classes.box, classes.fadeIn)}
      style={{ top, left }}
    >
      <h1> {val} </h1>
    </Box>
  );
};

export default GridItem;
