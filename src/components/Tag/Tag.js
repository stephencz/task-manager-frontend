import React from 'react';
import './Tag.css';

const getTagStyle = (data) => {
  return {
    color: data['fg'],
    backgroundColor: data['bg']
  }
}

const Tag = (props) => {
  return (
    <div className="tag" style={ getTagStyle(props.data) }>
      { props.data['name'] }
    </div>
  );
}

export default Tag;