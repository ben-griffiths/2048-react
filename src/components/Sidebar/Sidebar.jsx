import React, { useState } from "react";
import { range } from "../../helpers/common";
import classes from "./Sidebar.module.css";

export const Sidebar = (props) => {
  const { leaderboard, username } = props;
  const [name, setName] = useState(username)
  return (
    <div className={classes.little_padding}>
      <div className={classes.name_container}>
          <span className={classes.name}>Name:</span>
          <input className={classes.name_input} value={name} onChange={(event) => { console.log(event); setName(event.target.value) } } />
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
