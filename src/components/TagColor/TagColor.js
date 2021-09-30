import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { 
  setForegroundColor,
  setBackgroundColor,
  addUnsaved,
  saveTags
 } from '../../features/tags';

import ContentEditable from 'react-contenteditable';
import './TagColor.css';

/**
 * The TagColor component represents foreground or background
 * color selection for a Tag. The Tag expects the following props:
 * 
 *  id - The id of the Tag
 *  initialColor - The starting foreground or background color.
 *  isFG - True when foreground. False when background.
 * @param {*} props 
 * @returns 
 */
const TagColor = (props) => {

  // Real DOM references required by react-contenteditable
  const innerRef = useRef(null);

  // Redux dispatch for dispatching actions
  const dispatch = useDispatch();

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
    const content = event.target.textContent.trim();

    // Makes sure that the color only updates when it is valid.
    if(content.charAt(0) === '#') {
      if(content.length === 4 || content.length === 7) {
        if(props.isFG) {
          dispatch(setForegroundColor({ id: props.id, color: event.target.textContent }));

        } else {
          dispatch(setBackgroundColor({ id: props.id, color: event.target.textContent }));
        }

        // Save changes to the tag.
        dispatch(addUnsaved({ id: props.id }))
        dispatch(saveTags());
      }
    } 
  }

  /**
   * Updates changes to the tag foreground or background on changes to the
   * react-contenteditable component.
   * @param {*} event 
   */
  const handleChange = (event) => {
    let content = event.target.value.trim();

    // Makes sure that the color only updates when it is valid.
    if(content.charAt(0) === '#') {
      if(content.length === 4 || content.length === 7) {
        if(props.isFG) {
          dispatch(setForegroundColor({ id: props.id, color: event.target.value }));
    
        } else {
          dispatch(setBackgroundColor({ id: props.id, color: event.target.value }));
        }
      } 
    } 
  }

  /** @return The hex code representing the tag's current color. */
  const getTagColorText = () => {
    return props.initialColor;
  }

  return (
    <div className="tag-editor-color">
      <ContentEditable
        innerRef={ innerRef }
        html={ getTagColorText() }
        disabled={ false }
        onBlur = { handleBlur }
        onChange = { handleChange }
        onKeyDown = { handleKeyDown }
      />
    </div>
  );

}

export default TagColor;