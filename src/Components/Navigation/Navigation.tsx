import React from "react"
import classes from './Navigation.module.css'
import { NavLink } from "react-router-dom";
import { type } from "os";

type NavigationPropsType = {
}

const Navigation: React.FC <NavigationPropsType> = (props) => {

  return (<nav className={classes.nav}>
    <div className={classes.item}>
      <NavLink to='/profile' activeClassName={classes.activ}>Profile </NavLink>
    </div>
    <div className={classes.item}>
      <NavLink to='/messenger' activeClassName={classes.activ}>Messenger</NavLink>
    </div>
    <div className={classes.item}>
      <NavLink to='/users' activeClassName={classes.activ}>Users</NavLink>
    </div>
    <div className={classes.item}>
      <NavLink to='/news' activeClassName={classes.activ}>News</NavLink >
    </div>
    <div className={classes.item}>
      <NavLink to='/music' activeClassName={classes.activ}>Music</NavLink >
    </div >
    <div className={classes.item}>
      <NavLink to='/settings' activeClassName={classes.activ}>Settings</NavLink >
    </div >
    {/* <div className={classes.itemFriends}>
     Friends
        <img src = './logo192.png' alt="logo"/>
        {FrendsElements.name}
      <div/> */}
    {/* 
  </div> */}
  </nav>


  )
};

export default Navigation;