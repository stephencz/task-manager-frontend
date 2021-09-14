import React, { useRef } from 'react';

import { useDispatch } from 'react-redux';
import { 
  setForegroundColor,
  setBackgroundColor
 } from '../../features/tags';

import ContentEditable from 'react-contenteditable';
import './TagColor.css';

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

    if(content.charAt(0) === '#') {
      if(content.length === 4 || content.length === 7) {
        if(props.isFG) {
          dispatch(setForegroundColor({ id: props.id, color: event.target.textContent }));
    
        } else {
          dispatch(setBackgroundColor({ id: props.id, color: event.target.textContent }));
        }
      }
    } 
  }

  const handleChange = (event) => {
    console.log(event.target);
    let content = event.target.value.trim();

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

  const getTagColorText = () => {
    return props.initialColor;
  }

  const getSpanText = () => {
    if(props.isFG) {
      return <span>Foreground: </span>
    }

    return <span>Background: </span>
  }

  return (
    <div className="tag-editor-color">
      {getSpanText()} 
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