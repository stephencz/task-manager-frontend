import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelected, addSelected, removeSelected, clearSelected } from '../../features/tasks';

import './TaskHandle.css';

const TaskHandle = (props) => {

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

  
  
  return (
    <div className="task-handle" onClick={ handleTaskSelection } >

    </div>
  );

}

export default TaskHandle;