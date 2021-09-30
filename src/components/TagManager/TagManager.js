import React from 'react';

import TagOperations from '../TagOperations/TagOperations';
import TagEditorList from '../TagEditorList/TagEditorList';

import './TagManager.css';

/**
 * The TagManager component represents a combination of a
 * TagOperations component, for adding and removing tags, and
 * a TagEditorList component for displaying all the TagEditors
 * for all existing tags.
 * 
 * @param {*} props 
 * @returns 
 */
const TagManager = (props) => {

  return (
    <div className="row">
      <div className="col-xl-8 mx-auto">
        <div className="tag-manager">
          <div className="tag-manager-header">Tag Manager</div>
          <TagOperations />
          <TagEditorList /> 
        </div>
      </div>
    </div>
  );

}

export default TagManager;