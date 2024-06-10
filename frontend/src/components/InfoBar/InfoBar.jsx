import React from 'react';

const InfoBar = React.memo(({ room }) => {
  return (
    <div className="infoBar-container">
      <div className="leftInnerContainer">
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <img src={require("../../assets/closeIcon.png")} alt="close icon" />
        </a>
      </div>
    </div>
  );
});

InfoBar.displayName = 'InfoBar';

export default InfoBar;



/*
import React from 'react';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">
        <img src={require("../../assets/closeIcon.png")} alt="close icon" />
      </a>
    </div>
  </div>
);

export default InfoBar;*/