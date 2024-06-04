import React from 'react';


import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="info-bar">
    <div className="info-bar__left-inner-container">
      <h3>{room}</h3>
    </div>
    <div className="info-bar__right-inner-container">
      <a href="/">
      </a>
    </div>
  </div>
);

export default InfoBar;
