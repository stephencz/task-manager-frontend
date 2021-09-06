import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTaskDescription } from '../../features/tasks';

import ContentEditable from 'react-contenteditable'
import './TaskDescription.css';

/**
 * The TaskDescription Component represents an editable
 * text area where the user can write and describe what
 * they have to do to complete the given task.
 * 
 * Uses react-contentedible to handle editing.
 */
const TaskDescription = (props) => {

  // Real DOM references required by react-contenteditable
  const innerRef = useRef(null);

  const dispatch = useDispatch();

  /**
   * Called whenever a change is made to the task description.
   * @param {*} event 
   */
  const handleBlur = (event) => { 
    console.log(event.target)
    dispatch(setTaskDescription({ id: props.id, description: event.target.textContent }));
  }

  const handleKeyDown = (event) => {
    if(event.keyCode == 13) {
      event.target.blur();
      event.preventDefault();
    }
  }

  /**
   * Generates the task description
   * @param {*} props The Components properties
   * @returns A String containing the task's description.
   */
  const getDescriptionHTML = (props) => {
    if(props.description === null || props.description == "") {
      dispatch(setTaskDescription({ id: props.id, description: 'This is an empty task.' }))
      return 'This is an empty task.';

    } else {
      return props.description;

    }
  }

  return (
    <div className="task-description">
      <ContentEditable
        innerRef={ innerRef }
        html={ getDescriptionHTML(props) }
        disabled={ false }
        onBlur = { handleBlur }
        onKeyDown = { handleKeyDown }
        />
    </div>
  );

}

export default TaskDescription;