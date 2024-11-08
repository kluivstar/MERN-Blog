import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext';

const Header = () => {
  const {userInfo, setUserInfo} = useContext(UserContext);
  useEffect(()=> {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () =>{
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo(null)
  }
  const username = userInfo?.username;
  
  return (
    <div>
        <header>
            <Link to="/" className="">No Good Blog</Link>
            <nav className="">
              {username && (
                <>
                  <Link to="/create">Create New Post</Link>
                  <a onClick={logout}>Logout ({username})</a>
                </>
              )}
              {!username && (
                  <>
                    <Link to="/login" className="">Login</Link>
                    <Link to="/register" className="">Sign up</Link>
                  </>
              )}
            </nav>
        </header>
    </div>
  )
}

export default Header