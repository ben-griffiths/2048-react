import { AppBar, CssBaseline, Grid } from "@material-ui/core";
import React, { useState } from "react";
import "./App.css";
import Grid2048 from "./components/Grid2048";
import Palette from "./components/Palette";

function App() {
  const [score, setScore] = useState(0);
  return (
    <div>
      <Palette>
        <CssBaseline />
        <AppBar position="static" bgcolor="#6d4c41">
          <h1 style={{ padding: "12px" }}>2048-React</h1>
          <h1 style={{ padding: "12px", position: "absolute", right: "0" }}>
            Score {score}
          </h1>
        </AppBar>
        <Grid container>
          <Grid item sm={2}></Grid>
          <Grid container justify="center" sm={8} style={{ width: "100%" }}>
            <Grid2048 score={score} setScore={setScore} />
          </Grid>
          <Grid item sm={2}></Grid>
        </Grid>
      </Palette>
    </div>
  );
}

export default App;
