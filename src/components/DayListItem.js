import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

const formatSpots = function (props) {  //show how remaining interview spots in that day

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
  let dayClass = classnames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,


  }
  );


  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular" >{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}



