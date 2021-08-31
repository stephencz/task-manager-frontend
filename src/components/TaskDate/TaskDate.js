import React, {useState} from 'react';

import 'react-datepicker';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import './TaskDate.css';

const TaskDate = (props) => {
  const [startDate, setStartDate] = useState(new Date());

  return(
    
    <div className="task-date">
      <DatePicker selected={ startDate } onChange={ (date) => setStartDate(date) } />      
    </div>
  );
}

export default TaskDate;