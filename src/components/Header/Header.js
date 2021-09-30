import React from 'react';
import './Header.css';

/**
 * The Header displaying the name of the application at
 * the top of the page.
 * @param {*} props 
 * @returns 
 */
const Header = (props) => {

  return (
    <div className="row">
      <div className="col-xl-8 mx-auto">
        <div className="header">
          <div className="brand">Task Manager</div>
        </div>
      </div>
    </div>

  )

}

export default Header;