import React from 'react';

import TaskDescription from '../TaskDescription/TaskDescription';
import TaskDate from '../TaskDate/TaskDate';
import TaskTags from '../TaskTags/TaskTags';

import './Task.css';

/**
 * The Task Component represents a task within the Task List.
 * Every Task is composed of a TaskDescription, TaskDate, and
 * TaskTags components. This, respectively, allow each task to
 * have:
 * 
 *  1. A description describing to the user what the have to do
 *     for a given task.
 * 
 *  2. A date to represent a deadline or due date for the task.
 * 
 *  3. A collection of tags to help the user classify the task
 *     into a category, project, area, etc.
 *  
 */
const Task = (props) => {

  return(
    <div className="task">
      <TaskDescription description={ props.description } />
      <TaskTags tags={ props.tags } />
      <TaskDate date={ props.date } />
    </div>
  );

};

export default Task;