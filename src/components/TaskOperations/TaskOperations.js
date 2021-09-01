import React from 'react';
import { useDispatch } from 'react-redux';
import { addEmptyTask } from '../../features/tasks';
import './TaskOperations.css'

const TaskOperations = (props) => {

  const dispatch = useDispatch();

  return (
    <div className="task-operations">
      <input className="search" placeholder="Search"></input>
      
      <select>
        <option value="">Default</option>
        <option value="">Sort by Description</option>
        <option value="">Sort by Date</option>
        <option value="">Sort by Tag</option>
      </select>
      
      <button onClick={ () => dispatch(addEmptyTask()) }>
        Add Task
      </button>
      
      <button>
        Add Tag
      </button>
    </div>
  )

}

export default TaskOperations;