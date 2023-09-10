import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Sidebar</h2>
      <ul>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/charts-and-maps">Charts and Maps</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
