export function getInterviewersForDay(state, day) {
  const interviewersArray = [];
  const days = state.days;

  const targetDay = days.find(item => {
    return item.name === day;
  });

  if (!days.find(item => item.name === day) || state.days.length === 0) {
    return interviewersArray;
  }
 
  targetDay.interviewers.map((interviewerId) => {
    interviewersArray.push(state.interviewers[interviewerId])
  })
  
  
  
  return interviewersArray;
}



export function getAppointmentsForDay(state, day) {
  const appointmentArray = [];
  const days = state.days;

  const targetDay = days.find(item => {
    return item.name === day;
  });

  if (!days.find(item => item.name === day)) {
    return appointmentArray;
  }

  for (let key in state.appointments) {
    if (targetDay.appointments.includes(Number(key))) {

      appointmentArray.push(state.appointments[key]);
    }
  }

  return appointmentArray;
}

export function getInterview(state, interview) {
  
  if(!interview) {
    return null
  }
  
  const interviewInfo = {
    "student": interview.student,
    "interviewer": state.interviewers[interview.interviewer]
  }

return interviewInfo;
  
}