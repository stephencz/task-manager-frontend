import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { 
  setTagText,
  addUnsaved,
  saveTags
} from '../../features/tags';

import ContentEditable from 'react-contenteditable';

import './TagText.css';

/**
 * The TagText component represents the text that a tag displays
 * inside of itself.
 * 
 * @param {*} props 
 * @returns 
 */
const TagText = (props) => {

  // Real DOM references required by react-contenteditable
  const innerRef = useRef(null);

  const dispatch = useDispatch();

  /**
   * Gets the correct tag text based on what is passed to props.text.
   * @returns A String containing the correct tag text.
   */
  const getTagText = () => {
    if(props.text === null || props.text === "") {
      dispatch(setTagText({ id: props.id, text: 'Empty Tag' }));
      return "Empty Tag"

    } else {
      return props.text;

    }
  }

  /**
   * Used by react-contenteditable to blur the editable container
   * when the enter key is pressed.
   * @param {*} event 
   */
  const handleKeyDown = (event) => {
    // Key Code 13 means ENTER
    if(event.keyCode === 13) {
      event.target.blur();
      event.preventDefault();
    }
  }

  /**
   * Used by react-contenteditable and called when the editable container
   * is 'blurred', i.e loses focus. When blured the new contents of the
   * task description is used to update the Redux store.
   * @param {*} event 
   */
  const handleBlur = (event) => { 
    if(event.target.textContent.length > 126) {
      event.target.textContent = event.target.textContent.substring(0, 126);
    }

    dispatch(setTagText({ id: props.id, text: event.target.textContent }));
    dispatch(addUnsaved({ id: props.id }));
    dispatch(saveTags())
  }

  /**
   * Updates the tag's text as it is changed within the react-contenteditable
   * component.
   * @param {*} event 
   */
  const handleChange = (event) => {
    dispatch(setTagText({ id: props.id, text: event.target.value }));
  }

  return (
    <div className="tag-editor-text">
      <ContentEditable
        innerRef={ innerRef }
        html={ getTagText() }
        disabled={ false }
        onBlur={ handleBlur }
        onChange={ handleChange }
        onKeyDown={ handleKeyDown }
      />
    </div>
  );

};

export default TagText;