import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTasks } from '../../features/tasks';
import { getAllTaskTags } from '../../features/task_tags';
import sortTasks from '../../sort';

import Task from '../Task/Task';
import './TaskList.css';

/**
 * The TaskList component loads all the tasks of a specific
 * user and displays them in a list. Each Task is composed of
 * an optional description, date, and tags, and can be deleted
 */
const TaskList = (props) => {
   
  // Dispatches the getTasks thunk to retrieve an
  // up to date list of all tasks owned by the user.
  const dispatch = useDispatch();

  // Redux State
  const tasks = useSelector((state) => state.tasks.tasks);
  const task_tags = useSelector((state) => state.task_tags.task_tags);
  const status = useSelector((state) => state.tasks.status);

  useEffect(() => {
    dispatch(getAllTaskTags());
    dispatch(getAllTasks());
  }, [dispatch])

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
      if(tasks.length > 0) {
        const elements = tasks.map((task) => {
          return <Task 
            key={ task['task_id'] }
            id={ task['task_id'] }
            description={ task['task_description'] } 
            date={ task['task_date'] } 
            tags={ task.tags } 
            />
        }) 
  
        return elements;
      }
      
      return <div className="task-loading-status">You have no tasks yet.</div>
    }
  }

  return(
    <div className="task-list">
      { generateListAndStatus(status) }
    </div>
  );

};

export default TaskList;