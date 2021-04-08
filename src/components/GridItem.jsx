import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    box: {
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: "calc(25% - 16px)",
        height:"calc(25% - 16px)",
        margin: "8px",
        borderRadius: "16px"
    }
})

const toPercentage = (num) => (num.toString().concat("%"))

const GridItem = (props) => {
    const { num, index } = props;
    const classes = useStyles();
    
    const top = 25 * Math.floor(index / 4)
    const left = 25 * (index % 4)

    const bgcolor = num > 0 ? "white" : "darkgrey"
    return (
        <Box bgcolor={bgcolor} className={classes.box} 
            style={{top: toPercentage(top), left: toPercentage(left)}}
        >
            { num > 0 ? <h1> {num} </h1> : null }
        </Box>
    )
}

export default GridItem;
