import React from 'react';

import TaskDescription from '../TaskDescription/TaskDescription';
import TaskDate from '../TaskDate/TaskDate';
import TaskTags from '../TaskTags/TaskTags';

import './Task.css';

const Task = (props) => {

  return(
    <div className="task">
      <TaskDescription description={ props.description } />
      <TaskDate deadline={ props.deadline } />
      <TaskTags tags={ props.tags } />
    </div>
  );

};

export default Task;