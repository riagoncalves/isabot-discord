import React from 'react';
import arrowDown from '../../../assets/images/down-arrow.svg';

const UserDropdown = (props) => {
  return (
    <div className="user-dropdown-container" data-control="dropdown">
      <button className="user-dropdown">
        <img src={props.user.photo}/>
        <p className="info-white info-xsl info-sbold">{props.user.username.split('#')[0]}</p>
        <img src={arrowDown} className="arrow-down" />
      </button>
      <div className="user-dropdown-menu">
        <a href="/profile" className="info-xsl">Profile</a>
        <a href="/dashboard" className="info-xsl">Dashboard</a>
        <a href="/logout" className="info-xsl logout">Logout</a>
      </div>
    </div>
  );

};

export default UserDropdown;
