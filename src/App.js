import { AppBar, CssBaseline, Grid } from '@material-ui/core';
import React from 'react';
import './App.css';
import Grid2048 from './components/Grid2048';
import GridItem from './components/GridItem';

import { createMuiTheme } from '@material-ui/core/styles';
import Palette from './components/Palette';


function App() {
  return (
    <div style={{height: "100%"}} >
      <Palette>
        <CssBaseline />
        <AppBar position="static" bgcolor="#6d4c41">
          <h1 style={{padding: "12px"}}> 2048-React</h1>
        </AppBar>
        <Grid container style={{height: "100%"}} >
          <Grid item sm={2}></Grid>
          <Grid item container 
          justify="center" alignContent="center" style={{height: "100%"}}  sm={8}>
            <Grid2048 />
          </Grid>
          <Grid item sm={2}></Grid>
        </Grid>
      </Palette>
    </div>
  );
}

export default App;
