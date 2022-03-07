import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { 
  deleteSelectedTasks,
  setTaskDate,
  addSelected,
  addUnsaved,
  clearSelected
} from '../../features/tasks';

import {
  addTaskTag,
  removeTaskTag,
  clearTaskTagsForTaskIDs
} from '../../features/task_tags';


import './TaskOperations.css'

/**
 * The TaskOperations component allows the user to add a date to a task,
 * add and remove tags from a task, or delete the task itself. Each task
 * has its own instance of this component.
 * @param {*} props 
 * @returns 
 */
const TaskOperations = (props) => {

  const dispatch = useDispatch();

  // Used to toggle the visibility of the add and remove tag menu.
  const [addTagMenuVisible, setAddTagMenuVisible] = useState(false);
  const [removeTagMenuVisible, setRemoveTagMenuVisible] = useState(false);

  // Used to detect clicks outside of the add and remove tag menu
  // to close them.
  const addTagRef = useRef(null);
  const removeTagRef = useRef(null);

  //Handle clicks outside of task operation tag and remove tag menus
  useEffect(() => {
    const clickedOutside = (event) => {
      if(addTagMenuVisible && addTagRef.current && !addTagRef.current.contains(event.target)) {
        setAddTagMenuVisible(false);
      }

      if(removeTagMenuVisible && removeTagRef.current && !removeTagRef.current.contains(event.target)) {
        setRemoveTagMenuVisible(false);
      }
    }

    document.addEventListener("mousedown", clickedOutside);
    return () => {
      document.removeEventListener("mousedown", clickedOutside);
    }

  }, [addTagRef, removeTagRef, addTagMenuVisible, removeTagMenuVisible])

  const tasks = useSelector((state) => state.tasks.tasks);
  const selected = useSelector((state) => state.tasks.selected);
  const tags = useSelector((state) => state.tags.tags);
  const task_tags = useSelector((state) => state.task_tags.task_tags)

  /**
   * Gets the inline style object for the tag.
   * @param {*} tag The Tag Object
   * @returns 
   */
  const getColorStyle = (tag) => {
    return {
      color: tag.tag_fg,
      backgroundColor: tag.tag_bg
    }
  }

  /** Toggles add tag menu visibility */
  const handleAddTagMenuToggle = (event) => {
    if(addTagMenuVisible) {
      setAddTagMenuVisible(false);
    } else {
      setAddTagMenuVisible(true);
      setRemoveTagMenuVisible(false);
    }
  }

  /** Handles adding tags to a task object. */
  const handleAddTag = (element) => {
    if(selected.length > 0) {

      if(!selected.includes(props.id)) {
        if(!task_tags.some(task_tag => task_tag.tag_id === element.tag_id && task_tag.task_id === props.id)) {
          dispatch(addTaskTag({ tag_id: element.tag_id, task_id: props.id }));
        }
      }

      selected.forEach((item) => {   
        if(!task_tags.some(task_tag => task_tag.tag_id === element.tag_id && task_tag.task_id === item)) {
          dispatch(addTaskTag({ tag_id: element.tag_id, task_id: item }));
        }
      });
    } else {
      console.log(props);
      dispatch(addTaskTag({ tag_id: element.tag_id, task_id: props.id}));
    }

    //Hide the menu after clicking the tag.
    setRemoveTagMenuVisible(false);
    setAddTagMenuVisible(false);
  }

  /** Creates the HTML for the add tag menu. */
  const generateAddTagMenu = () => {
    if(addTagMenuVisible) {

      // We get an array of tag id's which the task is known to have.
      let matches = []
      for(let i = 0; i < task_tags.length; i++) {
        if(task_tags[i].task_id === props.id) {
          matches.push(task_tags[i].tag_id);
        }
      }

      // We get an array of tag that the task DOES NOT have.
      let addableIDs = []
      for(let i = 0; i < tags.length; i++) {
        if(!matches.includes(tags[i].tag_id)) {
          addableIDs.push(tags[i].tag_id);
        }
      }  

      if(addableIDs.length > 0) {

        // We get an array of Tag objects matching the tags the task DOES NOT have.
        const addableTags = tags.filter((element) => addableIDs.includes(element.tag_id));
        let buttons = addableTags.map((element) => {
          return <div 
            key={element.tag_id} 
            style={getColorStyle(element)}
            className="add-tag-button"
            onClick={ () => handleAddTag(element) }
            >
              { element.tag_text }
            </div>
        })

        return (
          <div className="floating-menu-wrapper">
            <div ref={addTagRef} className="floating-menu">
            { buttons }
            </div>
          </div>
          
        );
        
      } else {

        return (
          <div className="floating-menu-wrapper">
            <div ref={addTagRef} className="floating-menu">
              No tags to add
            </div>
          </div>
        );

      }
    }
  }

  /** Toggles the remove tag menu. */
  const handleRemoveTagMenuToggle = (event) => {
    if(removeTagMenuVisible) {
      setRemoveTagMenuVisible(false);
    } else {
      setRemoveTagMenuVisible(true);
      setAddTagMenuVisible(false);
    }
  }

  /** Handles removing a tag from a task. */
  const handleRemoveTag = (element) => {

    if(selected.length > 0) {
      
      if(!selected.includes(props.id)) {
        dispatch(removeTaskTag({ task_tag_object: { tag_id: element.tag_id, task_id: props.id }}))
      }

      selected.forEach((item) => {
        dispatch(removeTaskTag({ task_tag_object: { tag_id: element.tag_id, task_id: item }}))
      })

    } else {
      dispatch(removeTaskTag({ task_tag_object: { tag_id: element.tag_id, task_id: props.id } })); 
    }

    //Hide the menu after clicking the tag.
    setRemoveTagMenuVisible(false);
    setAddTagMenuVisible(false);

  }

  /**
   * Generates the HTML for the remove tag menu.
   * @param {*} event 
   * @returns 
   */
  const generateRemoveTagMenu = (event) => {
    if(removeTagMenuVisible) {

     // We get an array of tag id's which the task is known to have.
     let matches = []
     for(let i = 0; i < task_tags.length; i++) {
       if(task_tags[i].task_id === props.id) {
         matches.push(task_tags[i].tag_id);
       }
     }

     if(matches.length > 0) {
      // We get an array of tag that the task DOES have.
      let removeableIDs = []
      for(let i = 0; i < tags.length; i++) {
        if(matches.includes(tags[i].tag_id)) {
          removeableIDs.push(tags[i].tag_id);
        }
      }  

      // We get an array of Tag objects matching the tags the task DOES NOT have.
      const removeableTags = tags.filter((element) => removeableIDs.includes(element.tag_id));
      let buttons = removeableTags.map((element) => {
        return <div 
          key={element.tag_id} 
          className="remove-tag-button"
          style={getColorStyle(element)}
          onClick={ () => { handleRemoveTag(element) } }
          >
            { element.tag_text }
          </div>
      })

      return (
        <div className="floating-menu-wrapper">
          <div ref={removeTagRef} className="floating-menu">
            { buttons }
          </div>
        </div>
      );
     }
     else {

      return (
        <div className="floating-menu-wrapper">
          <div ref={removeTagRef} className="floating-menu">
            No tags to remove
          </div>
        </div>
        
      );
     }
    }
  }

  /** Toggle task date on and off. */
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
      
          } else {
            dispatch(setTaskDate({ 
              id: task.task_id, 
              newDate: new Date().toISOString()
            }));
            dispatch(addUnsaved({ id: task.task_id }));
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
  
      } else {
        dispatch(setTaskDate({ 
          id: props.id, 
          newDate: new Date().toISOString()
        }));
        dispatch(addUnsaved({ id: props.id }));
      }
    }
  }

  /** Deletes the task matching the id passed via props.id. */
  const handleDeleteTasks = () => {
    if(selected.length > 0){

      // If we click the remove button of a non-selected task
      // we must make sure to add it to selected.
      if(!selected.includes(props.id)) {
        dispatch(addSelected({ id: props.id }))
      }

      dispatch(clearTaskTagsForTaskIDs({selected_tasks: selected, activeID: props.id}))
      dispatch(deleteSelectedTasks());
      dispatch(clearSelected());

    } else {
  
      dispatch(addSelected({ id: props.id }));
      dispatch(clearTaskTagsForTaskIDs({selected_tasks: selected, activeID: props.id}))
      dispatch(deleteSelectedTasks());
      dispatch(clearSelected());

    }
  }

  return (
    <div className="task-operations">
      <div className="toggle-calendar-button" onClick={ handleDateToggle }></div>
      <div className="add-task-tags-button" onClick={ handleAddTagMenuToggle }></div>
      <div className="remove-task-tags-button" onClick={ handleRemoveTagMenuToggle }></div>
      <div className="remove-task-button" onClick={ handleDeleteTasks } ></div>

      { generateAddTagMenu() }
      { generateRemoveTagMenu() }
    </div>
  )

}

export default TaskOperations;