import React from 'react';

import { useSelector } from 'react-redux';

import TagHandle from '../TagHandle/TagHandle';
import TagText from '../TagText/TagText';
import TagColor from '../TagColor/TagColor';
import TagDisplay from '../TagDisplay/TagDisplay';

import './TagEditor.css';

const TagEditor = (props) => {

  const selected = useSelector(state => state.tags.selected);

  /**
   * Determines the correct class name for the Task.
   * @returns String
   */
  const getTagClassName = () => {

    if(selected.includes(props.id)) {
      return 'tag-editor selected';
    } 

    return 'tag-editor';
  }


  return (
    <div className={ getTagClassName() }>
      <TagHandle id={ props.id } />
      <TagText id={ props.id } text={ props.text } />
      <TagColor id={ props.id } initialColor={ props.fg} isFG={ true } />
      <TagColor id={ props.id } initialColor={ props.bg } isBG={ false }/>
      <TagDisplay id={ props.id } text={ props.text} fg={ props.fg } bg={ props.bg } />
    </div>
  );

}

export default TagEditor;