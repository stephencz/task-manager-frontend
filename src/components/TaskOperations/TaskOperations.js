import React from 'react';
import './TaskOperations.css'

const TaskOperations = (props) => {


  return (
    <div className="task-operations">
      <input className="search" placeholder="Search"></input>
      
      <select>
        <option value="">Default</option>
        <option value="">Sort by Description</option>
        <option value="">Sort by Date</option>
        <option value="">Sort by Tag</option>
      </select>
      
      <button >
        Add Task
      </button>
      
      <button>
        Edit Tags
      </button>

      <button>
        Save
      </button>
    </div>
  )

}

export default TaskOperations;