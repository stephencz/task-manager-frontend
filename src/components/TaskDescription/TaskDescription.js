import React from 'react';

import './TaskDescription.css';

const TaskDescription = (props) => {

  return (
    <div className="task-description">{ props.description }</div>
  );

}

export default TaskDescription;