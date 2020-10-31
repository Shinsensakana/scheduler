import React from "react";

import "./styles.scss";

import Confirm from "./Confirm";
import Status from "./Status";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode.js";


export default function Appointment(props) {

  console.log("props in appointment", props);
  // console.log("student in appointment", props.interview)
  // console.log("interviewer in appointment", props.interview.interviewer)
  const CONFIRM = "CONFIRM";
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log("clicked save");
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        // console.log("promise from axios");
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));

  }

  function cancel() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  }

  return (
    <>
      <article className="appointment">
        <Header time={props.time} id={props.id} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

        {mode === CREATE &&
          <Form
            interviewers={props.interviewers}
            onSave={save}
            onCancel={() => { return back(EMPTY); }}
            id={props.id}
          />
        }
        {mode === EDIT &&
          <Form
            interviewers={props.interviewers}
            interviewer={props.interview.interviewer.id}
            name={props.interview.student}
            onSave={save}
            onCancel={() => { return back(EMPTY); }}
            id={props.id}
          />
        }
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === CONFIRM &&
          <Confirm
            onCancel={back}
            onConfirm={cancel}
            message="Are you sure you would like to delete?"
          />}
        {mode === ERROR_SAVE && (
          <Error
            message="There was an error saving your appointment"
            onClose={back}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error
            message="There was an error deleting your appointment"
            onClose={back}
          />
        )}
      </article>
    </>
  );

};

