import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  createNewEmptyTask, 
  deleteSelectedTasks,
  setTaskDate,
  addUnsaved,
  saveTasks
 } from '../../features/tasks';

import './TaskOperations.css'

const TaskOperations = (props) => {

  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);
  const selected = useSelector((state) => state.tasks.selected);

  /**
   * When a task without a date as its calendar icon clicked its
   * date will be updated to the current date and will be re-rendered
   * with a react-datepicker component for further selection.
   * @param {*} event 
   */
  const handleDateToggle = (event) => {
    tasks.forEach((task) => {
      if(selected.includes(task.task_id)) {
        if(task.task_date !== null) {
          dispatch(setTaskDate({ 
            id: task.task_id, 
            newDate: null
          }));
          dispatch(addUnsaved({ id: task.task_id }));
          dispatch(saveTasks());
    
        } else {
          dispatch(setTaskDate({ 
            id: task.task_id, 
            newDate: new Date().toISOString()
          }));
          dispatch(addUnsaved({ id: task.task_id }));
          dispatch(saveTasks());
        }
      }
    })
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

      <button onClick={ () => handleDateToggle() }>
        Toggle Date
      </button>

      <button>
        Save
      </button>
    </div>
  )

}

export default TaskOperations;