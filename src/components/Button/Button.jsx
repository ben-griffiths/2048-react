import React from "react"
import classes from "./Button.module.css"

export const Button = (props) => {
    return <button {...props} className={classes.button}>{props.children}</button>
}