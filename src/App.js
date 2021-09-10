import React from 'react';

import Header from './components/Header/Header';
import TaskManager from './components/TaskManager/TaskManager';
import TagManager from './components/TagManager/TagManager';

import './App.css';

class App extends React.Component {

  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <div className="container">
        <div className="app-wrapper">
          <Header />
          <TaskManager />
          <TagManager />
        </div>
      </div>
    );
  }

}

export default App;
