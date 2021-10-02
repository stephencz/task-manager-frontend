import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  createNewEmptyTask,
  setSortMode,
  setShowMode,
  filterForSearch,
  filterForShowMode
} from '../../features/tasks';

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

  const handleSearchChange = (event) => {
    dispatch(filterForSearch({ text: event.target.value }))    
  }

  /** Changes the sort mode and re-sorts the tasks. */
  const handleSortChange = (event) => {
    let value = event.target.value;
    if(value === 'default' || value === 'description' || value === 'date' || value === 'tag') {
      dispatch(setSortMode(event.target.value))
      sortTasks(dispatch, event.target.value, task_tags, tags)
    }
  }

  /** Changes the show mode and hides or shows the tasks. */
  const handleOnShowChange = (event) => {
    if(event.target.value === 'all') {
      dispatch(setShowMode(-1))
      dispatch(filterForShowMode({ mode: -1, task_tags: task_tags, tag: tags}))
    } else {
      dispatch(setShowMode(event.target.value))
      dispatch(filterForShowMode({ mode: event.target.value, task_tags: task_tags, tag: tags}))
    }
  }

  /** @returns The HTML for the show mode drop down */
  const generateShowModeHTML = () => {
    return tags.map((x) => {
      return (
        <option 
          key={x.tag_id} 
          value={ x.tag_id } 
        >
          { x.tag_text }
        </option>
      );
    })
  }

  return (
    <div className="">
      <div className="task-search-sort">
        <input className="search" placeholder="Search" onChange={ (event) => handleSearchChange(event) }></input>
        <select className="all-sort" onChange={ (event) => handleSortChange(event) }>
          <option value="default">Default</option>
          <option value="description">Sort by Description</option>
          <option value="date">Sort by Date</option>
          <option value="tag">Sort by Tag</option>
        </select>

        <select className="show-only" onChange={ (event) => handleOnShowChange(event) }>
          <option value="all">Show All</option>
          { generateShowModeHTML() }
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