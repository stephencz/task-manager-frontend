import React from 'react';
import axios from 'axios';

import Task from '../Task/Task';

import './TaskList.css';

class TaskList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get("/getTasks").then(res => {
      console.log(res.data);
    });
  }

  render() {
    return(
      <div className="task-list">
        <Task description={"Implement the thing with the cool stuff"} tags={[{name: 'Programming', bg: "#e8a3cd", fg: "#000"}]} deadline={"August 31, 2021"} />
        <Task description={"Implement the thing with the cool stuff"} tags={[{name: 'Health', bg: "#4ee676", fg: "#000"}]} deadline={"August 31, 2021"}/>
      </div>
    );
  }

};

export default TaskList;