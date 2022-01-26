import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  addDemoTasks
} from '../../features/tasks';

import {
  addDemoTags
} from '../../features/tags';


import {
  addDemoTaskTags
} from '../../features/task_tags';

import TaskList from '../TaskList/TaskList';
import TaskSearchSort from '../TaskSearchSort/TaskSearchSort';
import './TaskManager.css';

/**
 * The TaskManager Component displays a list of Tasks generated
 * by the user and provides the means to edit, sort, and process
 * them.
 */
const TaskManager = (props) => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addDemoTags())
    dispatch(addDemoTasks())
    dispatch(addDemoTaskTags())
  }, [dispatch]);

  return (
    <div className="task-manager-wrapper">
      <div className="row">

        <div className="col-xl-8 mx-auto">
          <TaskSearchSort />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-8 mx-auto">
          <TaskList />
        </div>
      </div>

    </div>

  );
  
}

export default TaskManager;