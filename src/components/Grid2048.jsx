import { makeStyles } from '@material-ui/core';
import React from 'react';
import GridItem from './GridItem';

import {theme} from "./Palette"

const useStyles = makeStyles({
    box: {
        width: "100%",
        margin: "50px 10px 10px 10px",
        paddingBottom: "100%",
        position: "relative",
        border: "8px solid ".concat(theme.palette.secondary.main),
        background: theme.palette.secondary.main,
        borderRadius: "16px",
    }
})

function getRandomNum() {
    const x = Math.random();
    if (x < 0.7) {
        return 0;
    } else if (x < 0.95) {
        return 2;
    } else {
        return 4;
    }
  }


const Grid2048 = (props) => {
    const classes = useStyles();

    const items = [];
    for (var i = 0; i < 16; i++) {
        items.push(getRandomNum());
    }

    return (
        <div className={classes.box}>
            {items.map((num, index) => (
                <GridItem num={num} index={index}/>
            ))}
        </div>
    )
}

export default Grid2048;
