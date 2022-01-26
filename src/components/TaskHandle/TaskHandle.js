import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelected, addSelected, removeSelected, clearSelected } from '../../features/tasks';

import './TaskHandle.css';

/**
 * The TaskHandle component represents a selectable handle
 * used to manage selection of individual, or multiple, Task
 * components.
 * 
 * @param {*} props 
 * @returns 
 */
const TaskHandle = (props) => {

  const dispatch = useDispatch();
  const selected = useSelector(state => state.tasks.selected);

  /**
   * Handles the selection of tasks.
   * @param {*} event onClick event Object
   */
  const handleTaskSelection = (event) => {

    // logic for proper single selection, multi selection,
    // removal from selection, and selection clearing.
    if(!selected.includes(props.id)) {
      if(event.shiftKey || event.ctrlKey) {
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

  return ( <div className="task-handle" onClick={ handleTaskSelection } ></div> );
  
}

export default TaskHandle;