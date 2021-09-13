import React from 'react';
import TagEditorList from '../TagEditorList/TagEditorList';
import './TagManager.css';

const TagManager = (props) => {

  return (
    <div className="row">
      <div className="col-xl-10 mx-auto">
        <div className="tag-manager">
          <div className="tag-manager-header">Tag Manager</div>
          <TagEditorList /> 
        </div>
      </div>
    </div>
  );

}

export default TagManager;