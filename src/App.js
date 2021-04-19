import { AppBar, CssBaseline, Grid } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Grid2048, { createInitialItems, shift } from "./components/Grid2048";
import Palette from "./components/Palette";
import { KEY_BINDINGS } from "./helpers/common";

function App() {
  const [score, setScore] = useState(0);
  const [items, setItems] = useState(createInitialItems());
  const [deadItems, setDeadItems] = useState({});

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleKeyDown = (event) => {
    const states = [items, setItems, score, setScore, deadItems, setDeadItems];
    switch (event.keyCode) {
      case KEY_BINDINGS.KEY_LEFT:
        shift("left", ...states);
        break;
      case KEY_BINDINGS.KEY_UP:
        shift("up", ...states);
        break;
      case KEY_BINDINGS.KEY_RIGHT:
        shift("right", ...states);
        break;
      case KEY_BINDINGS.KEY_DOWN:
        shift("down", ...states);
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={inputRef}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      style={{ height: "100vh" }}
    >
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
          <Grid
            container
            item
            justify="center"
            sm={8}
            style={{ width: "100%" }}
          >
            <Grid2048
              items={items}
              deadItems={deadItems}
              setDeadItems={setDeadItems}
            />
          </Grid>
          <Grid item sm={2}></Grid>
        </Grid>
      </Palette>
    </div>
  );
}

export default App;
