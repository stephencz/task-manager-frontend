import React from 'react';

import TagOperations from '../TagOperations/TagOperations';
import TagEditorList from '../TagEditorList/TagEditorList';

import './TagManager.css';

const TagManager = (props) => {

  return (
    <div className="row">
      <div className="col-xl-10 mx-auto">
        <div className="tag-manager">
          <div className="tag-manager-header"><h1>Tag Manager</h1></div>
          <TagOperations />
          <TagEditorList /> 
        </div>
      </div>
    </div>
  );

}

export default TagManager;