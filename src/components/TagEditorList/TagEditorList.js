import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTags } from '../../features/tags';

import TagEditor from '../TagEditor/TagEditor';
import './TagEditorList.css';

/**
 * The TagEditorList component represents a list of TagEditor
 * components representing all Tags available to the task manager.
 * @param {*} props 
 * @returns 
 */
const TagEditorList = (props) => {

  const dispatch = useDispatch();

  // Make sure to get all the tags from the backend before
  // retrieving the store state.
  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch])

  const tags = useSelector((state) => state.tags.tags);
  const status = useSelector((state) => state.tags.status);

  /**
   * Generates a list of TagEditor components.
   * @param {*} status 
   * @returns A div representing the status of tag loading, or an
   * array of TagEditor objects.
   */
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
        });
  
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