import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Task from '../Task/Task';
import './TaskList.css';

const TaskList = (props) => {
   
  const tasks = useSelector((state) => state.tasks.tasks);
  const status = useSelector((state) => state.tasks.status);

  const generateListAndStatus = (status) => {
    if(status != null) {
      return <div className="task-loading-status"></div>
    } else {
      return tasks.map((task) => {
        return <Task description={ task.description } date={ task.date } tags={ task.tags } />
      }) 
    }
  }

  return(
    
    <div className="task-list">
     
      { () => { generateListAndStatus(status) } }
    </div>
  );

};

export default TaskList;