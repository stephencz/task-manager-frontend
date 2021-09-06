import React from 'react';

import Tag from '../Tag/Tag';
import AddTagButton from '../AddTagButton/AddTagButton';

import './TaskTags.css';

const TaskTags = (props) => {

  const createTags = (tags) => {
    if(tags === null || tags.length <= 0) {
      return;
    } else {
      return <Tag data={ tags[0] } /> // This has to generate for multiple tags 
    }
  }

  return (
    <div className="task-tags"> 
      {/* { createTags(props.tags) }  */}
      <AddTagButton />
    </div>
  );

}

export default TaskTags;