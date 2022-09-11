import React from "react";
import { range } from "../../helpers/common";
import classes from "./Sidebar.module.css";

export const Sidebar = (props) => {
  const { leaderboard, username } = props;
  return (
    <div className={classes.little_padding}>
      <div className={classes.header_container}>
        <div>
          <span className={classes.colour_white}>Name:</span>
          <input id="standard-basic" value={username} />
        </div>
      </div>
      <div className={classes.container}>
        <h1 className={classes.header}>LeaderBoard</h1>
        <div className={classes.no_padding}>
          {leaderboard ? (
            range(leaderboard.length).map((x) => (
              <div className={classes.item}>
                <span>{`${x + 1}.`}</span>
                <span>{leaderboard[x]["name"]}</span>
                <span>{leaderboard[x]["score"]}</span>  
              </div>
            ))
          ) : (
            <div size="2.5vw" />
          )}
        </div>
      </div>
    </div>
  );
};
