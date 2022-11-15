import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'

function NavBar(props) {
  return (
    <>
    {props.isAuth ? (
        <div>
          <ul className="navbar-ul">
          <li><Link to='/home'>Home</Link></li>
          <li><Link to={`/profile/${props.user.user.id}`}>Profile</Link></li>

          <li><Link to='/events'>Events</Link></li>
          <li><Link to='/CreateEvent'>Create Event</Link></li>

          <li><Link to="/logout" onClick={props.onLogoutHandler}>Logout</Link></li>
          {props.user ? "Welcome " + props.user.user.FirstName : null}
          </ul>
        </div>
     ) : (
      <div>
      <ul className="navbar-ul">
      <li><Link to='/home'>Home</Link></li>
      <li><Link to='/events'>Events</Link></li>
      <li><Link to="/signup">Signup</Link></li>
      <li><Link to="/signin">Signin</Link></li>
      </ul>
    </div>
     )}

    </>
  )
}
export default NavBar;
