import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@material-ui/core";
import React from "react";
import { range } from "../../helpers/common";
import classes from "./Sidebar.module.css";

export const Sidebar = (props) => {
  const { leaderboard, username } = props;
  return (
    <div className={classes.little_padding}>
      <div className={classes.header_container}>
        <TextField
          id="standard-basic"
          label="Name"
          InputProps={{ className: classes.colour_white }}
          defaultValue={username}
        />
      </div>
      <div className={classes.container}>
        <h1 className={classes.header}>LeaderBoard</h1>
        <List className={classes.no_padding}>
          {leaderboard ? (
            range(leaderboard.length).map((x) => (
              <ListItem className={classes.item}>
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
