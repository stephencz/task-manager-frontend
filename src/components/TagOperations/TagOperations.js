import React from 'react';

import { useDispatch } from 'react-redux';
import {
  createNewTag, 
  deleteSelectedTags
} from '../../features/tags';

import './TagOperations.css';

const TagOperations = (props) => {
  
  const dispatch = useDispatch();


  return (
    <div className="tag-operations">
      <button className="add-tag" onClick={ () => dispatch(createNewTag()) }>Add Tag</button>
      <button className="remove-tag" onClick={ () => dispatch(deleteSelectedTags()) }>Remove Tag</button>
    </div>
  )

}

export default TagOperations;