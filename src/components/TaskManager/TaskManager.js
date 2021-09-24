import React from 'react';

import TaskList from '../TaskList/TaskList';
import TaskSearchSort from '../TaskSearchSort/TaskSearchSort';
import './TaskManager.css';

/**
 * The TaskManager Component displays a list of Tasks generated
 * by the user and provides the means to edit, sort, and process
 * them.
 */
const TaskManager = (props) => {
  
  return (
    <div className="task-manager-wrapper">
      <div className="row">

        <div className="col-xl-12 mx-auto">
          <TaskSearchSort />
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