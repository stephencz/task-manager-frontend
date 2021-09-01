import React from 'react';
import TaskOperations from '../TaskOperations/TaskOperations';
import TaskList from '../TaskList/TaskList';
import './TaskManager.css';

const TaskManager = (props) => {
  
  
  return (
    <div class="task-manager">
      <TaskOperations />
      <TaskList />
    </div>
  );
}

export default TaskManager;