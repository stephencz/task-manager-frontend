import React, { useRef } from 'react';
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

  /**
   * Called whenever a change is made to the task description.
   * @param {*} event 
   */
   const handleChange = (event) => { }

  /**
   * Generates the task description
   * @param {*} props The Components properties
   * @returns A String containing the task's description.
   */
  const getDescriptionHTML = (props) => {
    if(props.description === null) {
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
        onChange = { handleChange }
        />
    </div>
  );

}

export default TaskDescription;