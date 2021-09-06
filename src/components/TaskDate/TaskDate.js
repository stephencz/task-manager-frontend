import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setTaskDate } from '../../features/tasks';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import './TaskDate.css';

/**
 * The TaskDate Components represents an arbitrary date that
 * is associated with a Task. This date could represent a deadline
 * or due date, or something else depending on the user. 
 * 
 * Task's do not start with a date, but can be set by clicking the
 * calendar icon next to the task. Once the date is set it can be
 * cleared by clicking the date and typing backspace or delete.
 * 
 * Uses react-datepicker for date selection.
 * 
 */
const TaskDate = (props) => {

  const calendarIconRef = useRef();

  // Dispatch for Redux actions.
  const dispatch = useDispatch();

  /**
   * Updates the redux store when a task's date is changed.
   * @param {*} date 
   */
  const handleDateChange = (date) => {
    dispatch(setTaskDate({ 
      id: props.id, 
      newDate: date.toISOString()
    }));
  }

  /**
   * When a task without a date as its calendar icon clicked its
   * date will be updated to the current date and will be re-rendered
   * with a react-datepicker component for further selection.
   * @param {*} event 
   */
  const handleCalendarIconClick = (event) => {
    dispatch(setTaskDate({ 
      id: props.id, 
      newDate: new Date().toISOString()
    }));
  }

  /**
   * Gets the HTML for rendering the task's date.
   * @param {*} props 
   * @returns HTML containing either a calendar button or a DatePicker component.
   */
  const getTaskDate = (props) => {

    if(props.date === null) {
      // If null display calendar button. When that button is clicked
      // we should create a DatePicker with the current date in it.
      return <div className="calendar-button" ref={ calendarIconRef } onClick={ handleCalendarIconClick }></div>

    } else {
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