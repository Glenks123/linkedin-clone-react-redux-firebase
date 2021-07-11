import React, { useState } from 'react';
import './Login.css';

import { auth } from './firebase';

import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';

function Login() {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    name: '',
    profileUrl: '',
    email: '',
    password: '',
  });

  const loginToApp = (e) => {
    e.preventDefault();
    const { email, password } = userInfo;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profileUrl: userAuth.user.profileUrl,
          })
        );
      })
      .catch((err) => {
        alert(err);
      });
  };

  const register = () => {
    const { name, profileUrl, email, password } = userInfo;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            profileUrl: profileUrl,
          })
          .then(() => {
            // dispatching our user to the data layer (data store)
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                profileUrl: profileUrl,
              })
            );
          });
      })
      .catch((err) => alert(err));
  };

  const changeHandler = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  console.log(userInfo);

  return (
    <div className="login">
      <img
        src="https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png?itok=q_lR0Vks"
        alt=""
      ></img>

      <form>
        <input
          name="name"
          placeholder="Full name (required if registering)"
          type="text"
          value={userInfo.name}
          onChange={changeHandler}
          required
        />
        <input
          name="profileUrl"
          placeholder="Profile pic URL (optional)"
          type="text"
          value={userInfo.profileUrl}
          onChange={changeHandler}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={userInfo.email}
          onChange={changeHandler}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={userInfo.password}
          onChange={changeHandler}
        />
        <button type="submit" onClick={loginToApp}>
          Sign In
        </button>
      </form>
      <p>
        Not a member?{' '}
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
