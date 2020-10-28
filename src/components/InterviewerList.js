import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
console.log("props",props)
return(
<section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  
  
  <ul className="interviewers__list">{props.interviewers.map(interviewer =>{
    // console.log("interviewer",props.interviewer)
    // console.log("interviewer.id",interviewer.id)
    
    
    return(
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={props.value===interviewer.id}
      setInterviewer={(event) =>props.onChange(interviewer.id)}
    />
    )}
  )}</ul>

</section>
);
}