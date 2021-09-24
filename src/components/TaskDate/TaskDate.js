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
   * Gets the HTML for rendering the task's date.
   * @param {*} props 
   * @returns HTML containing either a calendar button or a DatePicker component.
   */
  const getTaskDate = (props) => {

    if(props.date !== null) {
    //   // If null display calendar button. When that button is clicked
    //   // we should create a DatePicker with the current date in it.
    //   return <div className="calendar-button" ref={ calendarIconRef } onClick={ handleCalendarIconClick }></div>

    // } else {
      // if not null, display a DatePicker with the stored date in it.
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