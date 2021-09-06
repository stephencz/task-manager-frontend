import React, {useState} from 'react';

import 'react-datepicker';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import './TaskDate.css';

const TaskDate = (props) => {
  const [startDate, setStartDate] = useState(new Date());

  const parseDateString = (date) => {

  }

  const getTaskDate = (props) => {

    if(props.date === null) {
      // If null display calendar button. When that button is clicked
      // we should create a DatePicker with the current date in it.

    } else {
      // if not null, display a DatePicker with the stored date in it.
      return <DatePicker 
        selected={ parseDateString(props.date) }
        onChange={ (date) => setStartDate(date) }
        />
    }

  }

  return(
    <div className="task-date">
      <DatePicker selected={ startDate } onChange={ (date) => setStartDate(date) } />      
    </div>
  );
}

export default TaskDate;