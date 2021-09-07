import React from 'react';

import AddTagButton from '../AddTagButton/AddTagButton';

import './TaskTags.css';

const TaskTags = (props) => {

  return (
    <div className="task-tags"> 
      <AddTagButton />
    </div>
  );

}

export default TaskTags;