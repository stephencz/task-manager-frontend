import React from 'react';

import { useDispatch } from 'react-redux';
import {
  createNewEmptyTask
} from '../../features/tasks';

import TaskList from '../TaskList/TaskList';
import './TaskManager.css';

/**
 * The TaskManager Component displays a list of Tasks generated
 * by the user and provides the means to edit, sort, and process
 * them.
 */
const TaskManager = (props) => {
  
  const dispatch = useDispatch();

  return (
    <div className="task-manager-wrapper">
      <div className="row">

        <div className="col-xl-12 mx-auto">
          <div className="task-sort">
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
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 mx-auto">
          <TaskList />
        </div>
      </div>

    </div>

  );
  
}

export default TaskManager;