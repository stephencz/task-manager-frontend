import React from 'react';

import Header from './components/Header/Header';
import TaskManager from './components/TaskManager/TaskManager';
import TagManager from './components/TagManager/TagManager';

import './App.css';

class App extends React.Component {

  render() {
    return (
      <main>
        <div className="container-fluid">
          <div className="app-wrapper">
            <Header />
            <TaskManager />
            <TagManager />
          </div>
        </div>
      </main>
      
    );
  }

}

export default App;
