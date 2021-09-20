import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './TaskTags.css';

const TaskTags = (props) => {

  const task_tags = useSelector((state) => state.task_tags.task_tags);
  const tags = useSelector((state) => state.tags.tags);

  const getTag = (id) => {
    const results = tags.filter((element) => element.tag_id === id);
    return results[0];
  }

  const generateTags = () => {

    const matches = task_tags.filter((element) => {
      return element.task_id === props.id
    });

    if(matches.length > 0) {

      const results = matches.map((element) => {
        let tag = getTag(element.tag_id);
        if(tag !== undefined && tag !== null) {
          let tagStyle = {
            color: tag.tag_fg,
            backgroundColor: tag.tag_bg
          }
  
          return <div key={tag.tag_id} className="tag" style={tagStyle}> {tag.tag_text} </div>
        }        
      });

      return results;
    }

    return;
  }

  return (
    <div className="task-tags"> 
      { generateTags() }
    </div>
  );

}

export default TaskTags;