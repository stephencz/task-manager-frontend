import React from 'react';

import { useSelector } from 'react-redux';

import TaskHandle from '../TaskHandle/TaskHandle';
import TaskDescription from '../TaskDescription/TaskDescription';
import TaskTags from '../TaskTags/TaskTags';
import TaskDate from '../TaskDate/TaskDate';
import TaskOperations from '../TaskOperations/TaskOperations';

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

  const selected = useSelector(state => state.tasks.selected);

  /**
   * Determines the correct class name for the Task.
   * @returns String
   */
  const getTaskClassName = () => {

    if(selected.includes(props.id)) {
      return 'task selected';
    } 

    return 'task';
  }

  return(
    <div className={ getTaskClassName() }>
      <TaskHandle id={ props.id }/>
      <TaskDescription id={ props.id } description={ props.description } />
      <TaskTags id={ props.id } />
      <TaskDate id={ props.id } date={ props.date } />
      <TaskOperations id={ props.id } description={ props.description } date={ props.date} />
    </div>
  );

};

export default Task;