import React, { useEffect } from 'react';
import './App.css';

import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Login from './Login';

import { auth } from './firebase';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/userSlice';

function App() {
  // using redux to pull the user from the data slice
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // for persisted log in
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // if the user is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            profileUrl: userAuth.profileUrl,
          })
        );
      } else {
        // if the user is logged out
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <Header />

      {/* if there is no user, render the login page; else the whole of the app */}
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Feed />
          {/* Widgets */}
        </div>
      )}
    </div>
  );
}

export default App;
