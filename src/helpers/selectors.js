export function getAppointmentsForDay (state, day) {
  const appointmentArray = [];
  const days = state.days;
  
  const targetDay = days.find(item => {
    return item.name === day
  })
  
  if(!days.find(item => item.name === day )) {
    return appointmentArray;
  }
  
  // const filteredDays = state.days.filter(targetDay => targetDay.name === day);
  // const targetDayAppointment = filteredDays[0].appointments;
   

  for (let key in state.appointments) {
    if(targetDay.appointments.includes(Number(key))) {
      
      appointmentArray.push(state.appointments[key])
    }
  }
 
  return appointmentArray;
}