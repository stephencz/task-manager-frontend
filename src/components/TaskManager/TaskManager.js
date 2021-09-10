import React from 'react';
import TaskOperations from '../TaskOperations/TaskOperations';
import TaskList from '../TaskList/TaskList';
import './TaskManager.css';

/**
 * The TaskManager Component displays a list of Tasks generated
 * by the user and provides the means to edit, sort, and process
 * them.
 */
const TaskManager = (props) => {
  
  return (
    <div className="row">
      <div className="col-xl-10 mx-auto">
        <div className="task-manager">
          <TaskOperations />
          <TaskList />
        </div>
      </div>
    </div>

  );
  
}

export default TaskManager;