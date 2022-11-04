import React from "react";
import { range } from "../../helpers/common";
import classes from "./Sidebar.module.css";

export const Sidebar = (props) => {
  const { leaderboard, username, setUsername } = props;
  const onChange =  (event) => setUsername(event.target.value)

  return (
    <div className={classes.little_padding}>
      <div className={classes.name_container}>
          <span className={classes.name}>Name:</span>
          <input className={classes.name_input} value={username} onChange={onChange} />
      </div>
      <div className={classes.container}>
        <h1 className={classes.header}>LeaderBoard</h1>
        <div className={classes.no_padding}>
          {leaderboard ? (
            range(leaderboard.length).map((x) => (
              <div className={classes.item}>
                <span>{`${x + 1}.`}</span>
                <span class={classes.item_name}>{leaderboard[x]["name"]}</span>
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
