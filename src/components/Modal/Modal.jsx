import React from "react";
import classes from "./Modal.module.css";
import Button from "../Button";

export const Modal = ({ open, onClose, ...rest }) => {
  if (!open) return null;

  return (
    <div {...rest} className={classes.root}>
      <div className={classes.modal}>
        <div className={classes.button}>
          <Button onClick={onClose}>x</Button>
        </div>
        {rest.children}
      </div>
    </div>
  );
};
