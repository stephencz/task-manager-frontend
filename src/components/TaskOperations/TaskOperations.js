import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { 
  deleteSelectedTasks,
  setTaskDate,
  addSelected,
  addUnsaved,
  saveTasks
 } from '../../features/tasks';


import './TaskOperations.css'

const TaskOperations = (props) => {

  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);
  const selected = useSelector(state => state.tasks.selected);
  const tags = useSelector((state) => state.tags.tags);

  const [addTagMenuVisible, setAddTagMenuVisible] = useState(false);
  const [removeTagMenuVisible, setRemoveTagMenuVisible] = useState(false);

  const handleAddTagMenuToggle = (event) => {
    if(addTagMenuVisible) {
      setAddTagMenuVisible(false);
    } else {
      setAddTagMenuVisible(true);
    }
  }

  const handleRemoveTagMenuToggle = (event) => {
    if(removeTagMenuVisible) {
      setAddTagMenuVisible(false);
    } else {
      setAddTagMenuVisible(true);
    }
  }

  const generateAddTagMenu = () => {
    if(addTagMenuVisible) {
      return (
        <div className="floating-menu">
          <p>Test</p>
        </div>
      );
    } else {

    }
  }

  const generateRemoveTagMenu = () => {
    if(removeTagMenuVisible) {

    } else {
      
    }
  }

  const handleDateToggle = (event) => {

    if(selected.length > 0) {

      // If we click the date toggle button of a non-selected task
      // we must make sure to add it to selected.
      if(!selected.includes(props.id)) {
        dispatch(addSelected({ id: props.id }))
      }

      // toggle the date for all selected tasks
      tasks.forEach((task) => {
        if(selected.includes(task.task_id)) {
          if(task.task_date !== null) {
            dispatch(setTaskDate({ 
              id: task.task_id, 
              newDate: null
            }));
            dispatch(addUnsaved({ id: task.task_id }));
            dispatch(saveTasks());
      
          } else {
            dispatch(setTaskDate({ 
              id: task.task_id, 
              newDate: new Date().toISOString()
            }));
            dispatch(addUnsaved({ id: task.task_id }));
            dispatch(saveTasks());
          }
        }
      })

    } else {

      //if no tasks are selected toggle the date for the task
      //the toggle button belongs to.
      if(props.date !== null) {
        dispatch(setTaskDate({ 
          id: props.id, 
          newDate: null
        }));
        dispatch(addUnsaved({ id: props.id }));
        dispatch(saveTasks());
  
      } else {
        dispatch(setTaskDate({ 
          id: props.id, 
          newDate: new Date().toISOString()
        }));
        dispatch(addUnsaved({ id: props.id }));
        dispatch(saveTasks());
      }
    }
  }

  const handleDeleteTasks = () => {
    if(selected.length > 0){

      // If we click the remove button of a non-selected task
      // we must make sure to add it to selected.
      if(!selected.includes(props.id)) {
        dispatch(addSelected({ id: props.id }))
      }

      dispatch(deleteSelectedTasks())

    } else {
      dispatch(addSelected({ id: props.id }));
      dispatch(deleteSelectedTasks());
    }
  }

  return (
    <div className="task-operations">
      <button className="toggle-calendar-button" onClick={ handleDateToggle }></button>
      <button className="add-task-tags-button" onClick={ handleAddTagMenuToggle }></button>
      <button className="remove-task-tags-button" onClick={ handleRemoveTagMenuToggle }></button>
      <button className="remove-task-button" onClick={ handleDeleteTasks } ></button>

      { generateAddTagMenu() }
      { generateRemoveTagMenu() }
    </div>
  )

}

export default TaskOperations;