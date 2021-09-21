import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { 
  deleteSelectedTasks,
  setTaskDate,
  addSelected,
  addUnsaved,
  saveTasks
} from '../../features/tasks';

import {
  addTaskTag,
  removeTaskTag,
  clearTaskTags,
  saveTaskTags,
  deleteTaskTags,
  getAllTaskTags
} from '../../features/task_tags';


import './TaskOperations.css'

const TaskOperations = (props) => {

  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);
  const selected = useSelector(state => state.tasks.selected);
  const tags = useSelector((state) => state.tags.tags);
  const task_tags = useSelector((state) => state.task_tags.task_tags)

  const [addTagMenuVisible, setAddTagMenuVisible] = useState(false);
  const [removeTagMenuVisible, setRemoveTagMenuVisible] = useState(false);

  const handleAddTagMenuToggle = (event) => {
    if(addTagMenuVisible) {
      setAddTagMenuVisible(false);
    } else {
      setAddTagMenuVisible(true);
    }
  }

  const handleAddTag = (element) => {
    dispatch(addTaskTag({ tag_id: element.tag_id, task_id: props.id }));
    dispatch(clearTaskTags());
    dispatch(saveTaskTags());
  }

  const generateAddTagMenu = () => {
    if(addTagMenuVisible) {

      // We get an array of tag id's which the task is known to have.
      let matches = []
      for(let i = 0; i < task_tags.length; i++) {
        if(task_tags[i].task_id === props.id) {
          matches.push(task_tags[i].tag_id);
        }
      }

      console.log("Matches: " + matches);

      // We get an array of tag that the task DOES NOT have.
      let addableIDs = []
      for(let i = 0; i < tags.length; i++) {
        if(!matches.includes(tags[i].tag_id)) {
          addableIDs.push(tags[i].tag_id);
        }
      }  

      console.log("Addable IDs: " + addableIDs);

      // We get an array of Tag objects matching the tags the task DOES NOT have.
      const addableTags = tags.filter((element) => addableIDs.includes(element.tag_id));
      console.log("Addable Tags: " + addableTags);

      let buttons = addableTags.map((element) => {
        return <div 
          key={element.tag_id} 
          className="add-tag-button"
          onClick={ () => handleAddTag(element) }
          >
            { element.tag_text }
          </div>
      })
      console.log("Buttons: " + buttons);

      return (
        <div className="floating-menu">
          { buttons }
        </div>
      );
    }
  }

  const handleRemoveTagMenuToggle = (event) => {
    if(removeTagMenuVisible) {
      setRemoveTagMenuVisible(false);
    } else {
      setRemoveTagMenuVisible(true);
    }
  }

  const handleRemoveTag = (element) => {
    const taskTagToRemove = task_tags.find(taskTagObjects => taskTagObjects.tag_id === element.tag_id && taskTagObjects.task_id === props.id);
    dispatch(removeTaskTag({ task_tag_id: taskTagToRemove.task_tag_id }));
     dispatch(clearTaskTags());
    dispatch(deleteTaskTags());
  }

  const generateRemoveTagMenu = () => {
    if(removeTagMenuVisible) {

     // We get an array of tag id's which the task is known to have.
     let matches = []
     for(let i = 0; i < task_tags.length; i++) {
       if(task_tags[i].task_id === props.id) {
         matches.push(task_tags[i].tag_id);
       }
     }

     console.log("Matches: " + matches);

     // We get an array of tag that the task DOES have.
     let removeableIDs = []
     for(let i = 0; i < tags.length; i++) {
       if(matches.includes(tags[i].tag_id)) {
        removeableIDs.push(tags[i].tag_id);
       }
     }  

     console.log("Removable IDs: " + removeableIDs);

     // We get an array of Tag objects matching the tags the task DOES NOT have.
     const removeableTags = tags.filter((element) => removeableIDs.includes(element.tag_id));
     console.log("Addable Tags: " + removeableTags);

     let buttons = removeableTags.map((element) => {
       return <div 
        key={element.tag_id} 
        className="remove-tag-button"
        onClick={ () => { handleRemoveTag(element) } }
        >
          { element.tag_text }
        </div>
     })
     console.log("Buttons: " + buttons);

     return (
       <div className="floating-menu">
         { buttons }
       </div>
     );
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