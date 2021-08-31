import React from 'react';

import Header from './components/Header/Header';
import TaskManager from './components/TaskManager/TaskManager';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
    }
  }

  render() {
    return (
      <div className="app-wrapper">
        <Header />
        <TaskManager tasks={ this.state.tasks }/>
      </div>
    );
  }

}

export default App;
