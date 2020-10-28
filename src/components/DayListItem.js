import React from "react";
import "components/DayListItem.scss";

// const classNames = require('classnames');
import classnames from "classnames";

const formatSpots = function (props) {

  if (props.spots === 0) {
    return "no spots remaining";
  }
  if (props.spots === 1) {
    return "1 spot remaining";
  }

  if (props.spots >= 2) {
    return `${props.spots} spots remaining`;
  }
};

export default function DayListItem(props) {
  // console.log("props in daylist items",props)
  let dayClass = classnames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,


  }
  );


  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular" >{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}



