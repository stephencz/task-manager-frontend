import React from 'react';
import { useSelector } from 'react-redux';
import './TaskDescription.css';

const TaskDescription = (props) => {

  const tasks = useSelector((state) => state.tasks.value);

  return (
    <div className="task-description">
      <input type="text"/>
    </div>
  );

}

export default TaskDescription;