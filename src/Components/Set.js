import React from "react";
import Task from "./Task";

const Set = () => {

  function handleSubmit() {
      
  }
    
  return (
    <div className="App">
      <h1>What are you playing today?</h1>
      <input type="text" onSubmit="handleSubmit"></input>
      <Task />
      <Task />
      <Task />
    </div>
  );
};

export default Set;
