import React from 'react';

import TagText from '../TagText/TagText';
import TagColor from '../TagColor/TagColor';

import './TagEditor.css';

const TagEditor = (props) => {

  return (
    <div className="tag-editor">
      <TagText id={ props.id } text={ props.text } />
      <TagColor id={ props.id } initialColor={ '#232323'} isFG={ true } />
      <TagColor id={ props.id } initialColor={ '#' + props.bg } isBG={ false }/>
    </div>
  );

}

export default TagEditor;