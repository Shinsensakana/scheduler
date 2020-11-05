import { useState } from 'react';


export default function useVisualMode(initial) {
  const [state, setState] = useState([initial]);  //set initial state as an array
  function transition(mode, replace) {
    const newState = [...state]
    if (replace) {                                
      newState.pop();
    } 
    newState.push(mode);                          //replaces last item of state array with new state
    setState(newState);                           //set new state
    }
  const back = function () {
    if (state.length < 2) {                       //if length is 1 or 0 there is no previous state to return to
      return;
    }
    const newState = [...state]                   //spread the original state, pop off last state and reset state
    newState.pop();
    setState(newState);
  }
  
  const mode = state.slice(-1)[0]                 //return to the latest mode so component can render
  
  return { mode, transition, back };
}