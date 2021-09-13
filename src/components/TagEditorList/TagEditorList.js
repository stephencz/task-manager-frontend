import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTags } from '../../features/tags';

import TagEditor from '../TagEditor/TagEditor';
import './TagEditorList.css';

const TagEditorList = (props) => {

  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch])

  const tags = useSelector((state) => state.tags.tags);
  const status = useSelector((state) => state.tags.status);

  const generateTagEditorList = (status) => {
    if(status !== null) {
      return <div className="tag-loading-status"> { status } </div>
    } else {

      if(tags.length > 0) {
        const elements = tags.map((tag) => {
          return <TagEditor 
            key={ tag.tag_id }
            id={ tag.tag_id }
            text={ tag.tag_text }
            fg={ tag.tag_fg }
            bg={ tag.tag_bg }
            />
        }) 
  
        return elements;
      }

    }
  }

  return (
    <div className="tag-editor-list">
      { generateTagEditorList(status) }
    </div>
  );

}

export default TagEditorList;