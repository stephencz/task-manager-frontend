import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import tasks, {
  createNewEmptyTask,
  setSortMode,
  sortTasksByDefault
} from '../../features/tasks';


import '../../sort';
import sortTasks from '../../sort';
import './TaskSearchSort.css';

/**
 * The TaskSearchSort component provide an interface to change
 * how task's in the task manager are ordered and which tasks are
 * shown. In addition to this, it provides the button to create new
 * tasks and provides the ability to search through tasks via text.
 * 
 * Internally, the task slice has a sort mode and a show mode. The sort
 * modes can be:
 * 
 *  default - Show tasks as they naturally appear
 *  description - Sort tasks alphabetically by description
 *  date - Sort tasks by date from most recent to farthest away.
 *  tag - Sort tasks alphabetically by tag name
 * 
 * Show mode determines which tasks are shown via tag. It defaults to an
 * 'all' mode in which all tags are shown, but when a specific tag is selected
 * the mode will be set to the tag's id.
 * 
 * @param {*} props 
 * @returns 
 */
const TaskSearchSort = (props) => {

  const dispatch = useDispatch();

  const task_tags = useSelector((state) => state.task_tags.task_tags)
  const tags = useSelector((state) => state.tags.tags);
  const sortMode = useSelector((state) => state.tasks.sort_mode)

  const handleSortChange = (event, mode) => {
    dispatch(setSortMode(mode))
    sortTasks(dispatch, sortMode, task_tags, tags)
  }

  return (
    <div className="">
      <div className="task-search-sort">
        <input className="search" placeholder="Search"></input>
        <select className="all-sort">
          <option value="default" onClick={ () => handleSortChange('default') }>Default</option>
          <option value="sort-by-description" onClick={ () => dispatch(setSortMode('description')) }>Sort by Description</option>
          <option value="sort-by-date" onClick={ () => dispatch(setSortMode('date')) }>Sort by Date</option>
          <option value="sory-by-tag" onClick={ () => dispatch(setSortMode('tag')) }>Sort by Tag</option>
        </select>

        <select className="show-only">
          <option value=""></option>
        </select>
        
        <button
          className="new-task-button" 
          onClick={ () => dispatch(createNewEmptyTask()) }
        >
          New Task
        </button>
      </div>
    </div>
  );

};

export default TaskSearchSort;