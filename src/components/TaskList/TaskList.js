import React from 'react';
import { useSelector } from 'react-redux';

import Task from '../Task/Task';
import './TaskList.css';

/**
 * The TaskList component loads all the tasks and displays them
 * in a list. Each Task is composed of a description, date, and
 * tags, and operations.
 */
const TaskList = (props) => {
   
  const tasks = useSelector((state) => state.tasks.tasks);
  const status = useSelector((state) => state.tasks.status);

  /**
   * Generates the list of tasks and the status of task retrieval.
   * @param {*} status Null when task retrieval succeeds. Otherwise text.
   * @returns A list of components or elements.
   */
  const generateListAndStatus = (status) => {

    // If the list either is loading or fails to load, then we
    // display that status. Status becomes null after successful
    // loading.
    if(status !== null) {
      return <div className="task-loading-status"> { status } </div>

    } else {
      
      // If we successfully run the query and get back at least one
      // task then we map each element returned from the query to a
      // Task component.
      if(tasks.length > 0 && (tasks !== undefined || tasks !== null)) {
        
        const elements = tasks.map((task) => {
          if('hidden' in task && task.hidden === false) {
            return <Task 
              key={ task.task_id }
              id={ task.task_id }
              description={ task.task_description } 
              date={ task.task_date } 
              tags={ task.tags } 
            />
          } 

          if(!('hidden' in task)) {
            return <Task 
              key={ task.task_id }
              id={ task.task_id }
              description={ task.task_description } 
              date={ task.task_date } 
              tags={ task.tags } 
            />
          }
          
          return null;
        }) 
  
        return elements;
      }
    }
      
    return <div className="task-loading-status">You have no tasks yet.</div>
  }

  return(
    <div className="task-list">
      { generateListAndStatus(status) }
    </div>
  );

};

export default TaskList;