import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@material-ui/core";
import React from "react";
import { range } from "../helpers/common";
import { theme } from "./Palette";

const Sidebar = (props) => {
  const { leaderboard, username } = props;
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          background: theme.palette.tertiary.main,
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <TextField
          id="standard-basic"
          label="Name"
          style={{ width: "100%" }}
          InputProps={{ style: { color: "white" } }}
          defaultValue={username}
        />
      </div>
      <div
        style={{
          background: theme.palette.tertiary.main,
          marginTop: "10px",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <h1 style={{ margin: 0, color: "white" }}>LeaderBoard</h1>
        <List style={{ padding: 0 }}>
          {leaderboard ? (
            range(leaderboard.length).map((x) => (
              <ListItem
                style={{
                  background: theme.palette.secondary.main,
                  marginTop: "10px",
                  padding: "0 0 0 10px",
                  borderRadius: "10px",
                }}
              >
                <ListItemText primary={`${x + 1}.`} />
                <ListItemText
                  primary={leaderboard[x]["name"]}
                  secondary={leaderboard[x]["score"]}
                />
              </ListItem>
            ))
          ) : (
            <CircularProgress size="2.5vw" />
          )}
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
