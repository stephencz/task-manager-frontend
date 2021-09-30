import React from 'react';
import { useDispatch } from 'react-redux';

import {
  createNewTag, 
  deleteSelectedTags
} from '../../features/tags';

import './TagOperations.css';

/**
 * The TagOperations component represents the operations that can
 * be performed on selected Tag objects. Currently, the only two 
 * supported operations are adding new tags and removing existing tags.
 * 
 * @param {*} props 
 * @returns 
 */
const TagOperations = (props) => {
  
  const dispatch = useDispatch();

  return (
    <div className="tag-operations">
      <button className="add-tag" onClick={ () => dispatch(createNewTag()) }>Add Tag</button>
      <button className="remove-tag" onClick={ () => dispatch(deleteSelectedTags()) }>Remove Tag</button>
    </div>
  );

}

export default TagOperations;