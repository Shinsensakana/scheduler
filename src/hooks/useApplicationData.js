import { useState, useEffect } from "react";
import axios from "axios";
export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  useEffect(() => {                               //makes axios api calls 
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,                       //updates state for days, appointments and interviewers
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  const setDay = (day) => setState({ ...state, day });    //function to set state for day
  const updateSpots = (day, days, appointments) => {      //update available spots after cancelInterview and bookinterview is called
    
    const dayIndex = days.findIndex((d) => d.name === day); //finds the index in the array of days in state to udpate
    
    const dayObj = days[dayIndex];                          //finds day from the array of days in state with the index
   
    const appointmentIDs = dayObj.appointments;             //finds the appointment object in the day from the array of days
    
    let spots = 0;
    for (const id of appointmentIDs) {
      let appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    let newDayObj = {...dayObj, spots};                   //updating state for spots
    let newDaysArray = [...days];                         //making a copy of the days array to avoid mutating state
    newDaysArray[dayIndex] = newDayObj;                   //updates the copy with the updated day information
   
    return newDaysArray;
  };
  const bookInterview = (id, interview) => {              //books an interview
    
    const appointment = {                                 //creates a copy of the state up to the appointments with interview
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {                                //updates state of appointmentss with appointment
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`api/appointments/${id}`, appointment).then(() => {  //makes axios call to update appointmnet
      let newDays = updateSpots(state.day, state.days, appointments);     //uses newDays from updateSpots to update spots after
      setState({ ...state, appointments , days: newDays });
    });
  };
  const cancelInterview = (id) => {                       //cancels an interview
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      appointment.interview = null;
      let newDays = updateSpots(state.day, state.days, appointments);
      setState({ ...state, appointments, days: newDays });
    });
  };
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}