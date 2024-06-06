import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="info-bar">
    <div className="info-bar__left-inner-container">
      <h3>{room}</h3>
    </div>
    <div className="info-bar__right-inner-container">
      <Link to="/">
        <i className="fa fa-close"></i> {/* Assuming you have FontAwesome */}
      </Link>
    </div>
  </div>
);

export default InfoBar;
