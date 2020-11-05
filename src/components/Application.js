import React from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) { 
  
  const {                                                     //import helper functions object from custom hook
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  
  
  const appointments = getAppointmentsForDay(state, state.day); //get an object of appointments for that day from API
  const interviewers = getInterviewersForDay(state, state.day); //get an object of interviewers for that day from API
  
  

  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            handleSetDay={setDay} 
            
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview); //get an interview from an object of appointments from API
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={interviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          );
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
