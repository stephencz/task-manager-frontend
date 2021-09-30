import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setTaskDescription, addUnsaved, saveTasks } from '../../features/tasks';
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

  // Redux dispatch for dispatching actions
  const dispatch = useDispatch();

  /**
   * Used by react-contenteditable to blur the editable container
   * when the enter key is pressed.
   * @param {*} event 
   */
  const handleKeyDown = (event) => {
    // Key Code 13 means ENTER
    if(event.keyCode === 13) {
      event.target.blur();
      event.preventDefault();
    }
  }

  /**
   * Used by react-contenteditable and called when the editable container
   * is 'blurred', i.e loses focus. When blured the new contents of the
   * task description is used to update the Redux store.
   * @param {*} event 
   */
  const handleBlur = (event) => {
    
    // Trim to a length of 255
    if(event.target.textContent.length > 253) {
      event.target.textContent = event.target.textContent.substring(0, 253);
      
    } 

    // Set the task's description and save the change.
    dispatch(setTaskDescription({ id: props.id, description: event.target.textContent }));
    dispatch(addUnsaved({ id: props.id }));
    dispatch(saveTasks());
  }

  /**
   * Gets the task description or sets it to the default if the description is
   * null or empty.
   * @param {*} props 
   * @returns A String containing the task's description.
   */
  const getDescriptionText = (props) => {
    if(props.description === null || props.description === "") {
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
        html={ getDescriptionText(props) }
        disabled={ false }
        onBlur = { handleBlur }
        onKeyDown = { handleKeyDown }
        />
    </div>
  );

}

export default TaskDescription;