import React from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import {
  setTaskDate,
  addUnsaved, 
  saveTasks
  } from '../../features/tasks';

import './TaskDate.css';

/**
 * The TaskDate Components represents an arbitrary date that
 * is associated with a Task. This date could represent a deadline
 * or due date, or something else depending on the user. 
 * 
 * Uses react-datepicker for date selection.
 * 
 */
const TaskDate = (props) => {

  // Dispatch for Redux actions.
  const dispatch = useDispatch();

  /**
   * Updates the redux store when a task's date is changed.
   * @param {*} date 
   */
  const handleDateChange = (date) => {

    if(date != null) {
      dispatch(setTaskDate({ 
        id: props.id, 
        newDate: date.toISOString()
      }));
      dispatch(addUnsaved({ id: props.id }));
      dispatch(saveTasks());
    }
    
  }

  /**
   * Gets the a DatePicker component matching the passed in props.date.
   * @param {*} props 
   * @returns DatePicker
   */
  const getTaskDate = (props) => {

    if(props.date !== null) {
      return <DatePicker 
        selected={ new Date(props.date) }
        onChange={ (date) => handleDateChange(date) }
        />
    }
  }

  return(
    <div className="task-date">
      { getTaskDate(props) }   
    </div>
  );
}

export default TaskDate;