import React from 'react';

import { useDispatch } from 'react-redux';
import {
  createNewTag, 
  deleteSelectedTags
} from '../../features/tags';

const TagOperations = (props) => {
  
  const dispatch = useDispatch();


  return (
    <div className="tag-operations">
      <button onClick={ () => dispatch(createNewTag()) }>Add Tag</button>
      <button onClick={ () => dispatch(deleteSelectedTags()) }>Remove Tag</button>
    </div>
  )

}

export default TagOperations;