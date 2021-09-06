import React from 'react';

import Header from './components/Header/Header';
import TaskManager from './components/TaskManager/TaskManager';

import './App.css';

class App extends React.Component {

  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <div className="app-wrapper">
        <Header />
        <TaskManager />
      </div>
    );
  }

}

export default App;
