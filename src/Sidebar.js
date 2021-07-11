import React from 'react';
import './Sidebar.css';

import { Avatar } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

function Sidebar() {
  // getting current user
  const user = useSelector(selectUser);

  const { email, displayName, profileUrl } = user;

  const recentItem = (topic) => {
    return (
      <div className="sidebar__recentItem">
        <span className="sidebar__hash">#</span>
        <p>{topic}</p>
      </div>
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.1.2&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDBfHw%3D&w=1000&q=80"
          alt=""
        />
        <Avatar src={profileUrl}>{user?.displayName[0].toUpperCase()}</Avatar>
        <h2>{displayName}</h2>
        <h4>{email}</h4>
      </div>

      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who viewed you</p>
          <p className="sidebar__statNumber">2,582</p>
        </div>

        <div className="sidebar__stat">
          <p>Views on post</p>
          <p className="sidebar__statNumber">2,483</p>
        </div>
      </div>

      <div className="sidebar__bottom">
        <p>Recent</p>
        {recentItem('programming')}
        {recentItem('software')}
        {recentItem('reactjs')}
        {recentItem('firebase')}
        {recentItem('redux')}
        {recentItem('javascript')}
      </div>
    </div>
  );
}

export default Sidebar;
