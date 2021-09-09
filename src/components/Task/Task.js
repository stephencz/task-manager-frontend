import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setSelected, addSelected, removeSelected, clearSelected } from '../../features/tasks';

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

  const dispatch = useDispatch();

  const selected = useSelector(state => state.tasks.selected);

  /**
   * Handles the selection of tasks.
   * @param {*} event onClick event Object
   */
  const handleTaskSelection = (event) => {

    if(!selected.includes(props.id)) {
      if(event.shiftKey) {
        dispatch(addSelected({ id: props.id }));

      } else {
        dispatch(setSelected({ id: props.id }));

      }
    } else {
      if(!event.shiftKey && selected.length > 1) {
        dispatch(clearSelected());

      } else {
        dispatch(removeSelected({ id: props.id }));

      }
    }

  }

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
    <div 
      className={ getTaskClassName() }  
      onClick={ handleTaskSelection }
    >
      <TaskDescription id={ props.id } description={ props.description } />
      <TaskTags id={ props.id } tags={ props.tags } />
      <TaskDate id={ props.id } date={ props.date } />
    </div>
  );

};

export default Task;