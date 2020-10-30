import React from "react";
import "./styles.scss";

import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode.js";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment (props) {
  const { mode, transition, back } = useVisualMode (
    props.interview ? SHOW : EMPTY
  );

return(
<>
<Header time={props.time} id={props.id}/>
<article className="appointment"></article>
{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

{mode === CREATE && <Form interviewers={[]}/>}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
  />
)}
</>
)

};

{/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty/>} */}