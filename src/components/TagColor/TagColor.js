import React, { useRef } from 'react';

import { useDispatch } from 'react-redux';
import { 
  setForegroundColor,
  setBackgroundColor
 } from '../../features/tags';

 import ContentEditable from 'react-contenteditable'
import { HexColorPicker } from 'react-colorful';

import './TagColor.css';

const TagColor = (props) => {

  // Real DOM references required by react-contenteditable
  const innerRef = useRef(null);

  const dispatch = useDispatch();

  const handleChangeComplete = (color) => {
    console.log("Change done");
  }

  const handleChange = (color, event) => {
    if(props.isFG) {
      dispatch(setForegroundColor({ id: props.id, color: color }));

    } else {
      dispatch(setBackgroundColor({ id: props.id, color: color }));
    }
  }

  return (
    <div className="tag-editor-color">
      <ContentEditable
        innerRef={ innerRef }
        html={ getDescriptionText(props) }
        disabled={ false }
        onBlur = { handleBlur }
        onKeyDown = { handleKeyDown }
        />
      <HexColorPicker 
        color={ props.initialColor }
        onChange={ handleChange }
      /> 
    </div>
  );

}

export default TagColor;