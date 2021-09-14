import React from 'react';
import './TagDisplay.css';



const TagDisplay = (props) => {

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