import React from "react";
import { range } from "../../helpers/common";
import classes from "./Leaderboard.module.css";

export const LeaderBoard = (props) => {
  const { leaderboard, username, setUsername } = props;
  const onChange = (event) => setUsername(event.target.value);

  return (
    <div>
      <div className={classes.name_container}>
        <span className={classes.name}>Name:</span>
        <input
          className={classes.name_input}
          value={username}
          onChange={onChange}
        />
      </div>
      <div className={classes.container}>
        <h1 className={classes.header}>LeaderBoard</h1>
        <div className={classes.no_padding}>
          {leaderboard ? (
            range(leaderboard.length).map((x) => (
              <div className={classes.item}>
                <span>{`${x + 1}.`}</span>
                <div class={classes.item_name}>
                  <span>{leaderboard[x]["name"]}</span>
                </div>
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
