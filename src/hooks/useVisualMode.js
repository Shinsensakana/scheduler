import { useState } from 'react';


export default function useVisualMode(initial) {
  const [state, setState] = useState([initial]);
  function transition(mode, replace) {
    const newState = [...state]
    if (replace) {
      newState.pop();
    } 
    newState.push(mode);
    setState(newState);
    // setState(prev => {
    //   const newState = [...prev]
    //   if (replace) {
    //     newState.pop();
    //   }
    //   newState.push(mode)
    //   return newState;
    // })
  }
  const back = function () {
    if (state.length < 2) {
      return;
    }
    const newState = [...state]
    newState.pop();
    setState(newState);
  }
  // console.log(state);
  const mode = state.slice(-1)[0]
  // console.log('mode :', mode);
  return { mode, transition, back };
}