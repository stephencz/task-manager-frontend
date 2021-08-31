import React from 'react';

import Tag from '../Tag/Tag';

import './TaskTags.css';

const TaskTags = (props) => {

  const createTags = (tags) => {
    
    return <Tag data={ tags[0] } />
    // return tags.map(x => {
    //   return <Tag name={ x } />
    // });
  }

  return (
    <div className="task-tags"> { createTags(props.tags) } </div>
  );

}

export default TaskTags;