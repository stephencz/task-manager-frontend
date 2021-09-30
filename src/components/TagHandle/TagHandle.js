import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setSelected, addSelected, removeSelected, clearSelected } from '../../features/tags';

import './TagHandle.css';

/**
 * The TagHandle component represents a selectable handle. Upon being
 * clicked this handle will 'select' the tag so that it can removed or
 * have some other operation applied to it.
 * @param {*} props 
 * @returns 
 */
const TagHandle = (props) => {

  const dispatch = useDispatch();
  const selected = useSelector(state => state.tags.selected);

  /**
   * Handles the selection of tagssks.
   * @param {*} event onClick event Object
   */
  const handleTagSelection = (event) => {

    // Handles tag selection to enable multi tag selection,
    // removing a tag from selection, and clearing selection.
    if(!selected.includes(props.id)) {
      if(event.shiftKey) {
        dispatch(addSelected({ id: props.id }));

      } else {
        dispatch(setSelected({ id: props.id }));

      }
    } else {
      if(!event.shiftKey && selected.length > 1) {
        dispatch(clearSelected());

      } else {
        dispatch(removeSelected({ id: props.id }));

      }
    }
  }

  return ( <div className="tag-editor-handle" onClick={ handleTagSelection }></div> );
}

export default TagHandle;