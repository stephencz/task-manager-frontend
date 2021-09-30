import React from 'react';
import './TagDisplay.css';

/**
 * The TagDisplay component represents a dummy tag, that
 * matches the tags as we would see them next to an actual
 * task. It serves the purpose of giving the user an accurate
 * portrayal of what their tag will look like in action.
 * @param {*} props 
 * @returns 
 */
const TagDisplay = (props) => {

  /** @returns A Javscript Object representing the inline styles of the tag. */
  const getColorStyle = (props) => {
    return {
      color: props.fg,
      backgroundColor: props.bg
    }
  }

  return (
    <div className="tag-editor-display" style={ getColorStyle(props) }>
      { props.text }
    </div>
  );  
}

export default TagDisplay;