import React from 'react';
import axios from "axios";

import TaskOperations from '../TaskOperations/TaskOperations';
import TaskList from '../TaskList/TaskList';
import './TaskManager.css';

/**
 * How should a task be strucuted?
 * 
 * status - WE DON'T NEED a status because we can simple remove the task when its done.
 * 
 */

class TaskManager extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    }
  }

  render() {
    return (
      <div class="task-manager">
        <TaskOperations />
        <TaskList tasks={ this.state.tasks }/>
      </div>
    );
  }
}

export default TaskManager;