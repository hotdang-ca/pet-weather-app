import React from 'react';

const AppWrapper = ({ children, title }) => (
  <div id='AppWrapper'>
    <div className='nav-bar'>
      <h1>{title}</h1>
    </div>

    { children }
  </div>
);

export default AppWrapper;
