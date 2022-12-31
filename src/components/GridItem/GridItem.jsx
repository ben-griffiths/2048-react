import React from "react";
import classes from "./GridItem.module.css";

const toPercentage = (num) => num.toString().concat("%");

export const GridItem = (props) => {
  const { items, id, type } = props;
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    setExpanded(true);
    setTimeout(() => setExpanded(false), 100);
  }, [items[id]?.[2]]);

  if (!(id in items)) return null;
  var [x, y, val] = items[id];

  var left = toPercentage(x * 25);
  var top = toPercentage(y * 25);

  let className = classes.box;
  if (type === "dead") {
    className += ` ${classes.red}`;
  }
  if (expanded) {
    className += ` ${classes.expanded}`;
  }
  className += ` ${classes[`tile${val}`]}`;

  return (
    <div
      data-testid={`grid-item-${type}`}
      className={className}
      style={{ top, left }}
    >
      {type === "blank" ? null : <h1 className={classes.text}> {val} </h1>}
    </div>
  );
};
