import React from "react";
import classes from "./Sidebar.module.css";

export const Sidebar = (props) => {
  return <div className={classes.little_padding}>{props.children}</div>;
};
