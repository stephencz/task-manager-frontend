import React from 'react';
import { useDispatch } from 'react-redux';
import { 
  createNewEmptyTask, 
  deleteSelectedTasks,
 } from '../../features/tasks';

import './TaskOperations.css'

const TaskOperations = (props) => {

  const dispatch = useDispatch();

  const handleDateToggle = (event) => {
    
  }

  return (
    <div className="task-operations">
      <input className="search" placeholder="Search"></input>
      
      <select>
        <option value="">Default</option>
        <option value="">Sort by Description</option>
        <option value="">Sort by Date</option>
        <option value="">Sort by Tag</option>
      </select>
      
      <button onClick={ () => dispatch(createNewEmptyTask()) }>
        New Task
      </button>

      <button onClick={ () => dispatch(deleteSelectedTasks()) }>
        Remove Task
      </button>
      
      <button>
        Edit Tags
      </button>

      <button>
        Toggle Date
      </button>

      <button>
        Save
      </button>
    </div>
  )

}

export default TaskOperations;