import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
export default function Appointment (props) {

return(
<>
<Header time={props.time} id={props.id}/>
<article className="appointment"></article>
{props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty/>}
</>
)

};
