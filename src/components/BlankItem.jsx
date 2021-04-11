import { Box, makeStyles } from "@material-ui/core";
import React from "react";

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
  },
});

const toPercentage = (num) => num.toString().concat("%");

const BlankItem = (props) => {
  const classes = useStyles();
  const { x, y } = props;

  var left = toPercentage(x * 25);
  var top = toPercentage(y * 25);

  return (
    <Box bgcolor={"darkgrey"} className={classes.box} style={{ top, left }} />
  );
};

export default BlankItem;
