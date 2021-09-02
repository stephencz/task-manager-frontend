import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadTasks } from '../../features/tasks';

import Task from '../Task/Task';
import './TaskList.css';

const TaskList = (props) => {

  const tasks = useSelector((state) => state.tasks.value);
  const dispatch = useDispatch()

  dispatch(getTasks());

  return(
    <div className="task-list">
      { 
        tasks.map((task) => {
          return <Task description={ task.description } date={ task.date } tags={ task.tags } />
        }) 
      }
    </div>
  );

};

export default TaskList;