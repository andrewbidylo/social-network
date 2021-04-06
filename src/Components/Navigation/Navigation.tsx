import React from "react"
import classes from './Navigation.module.css'
import { NavLink } from "react-router-dom";


type NavigationPropsType = {
}

const Navigation: React.FC<NavigationPropsType> = (props) => {

  return (<nav className={classes.nav}>
    <div className={classes.item}>
      <NavLink to='/profile' activeClassName={classes.activ}>Profile </NavLink>
    </div>
    <div className={classes.item}>
      <NavLink to='/chat' activeClassName={classes.activ}>Chat</NavLink>
    </div>
    <div className={classes.item}>
      <NavLink to='/users' activeClassName={classes.activ}>Users</NavLink>
    </div>
    <div className={classes.item}>
      <NavLink to='/todo' activeClassName={classes.activ}>Todo</NavLink >
    </div >
    <div className={classes.item}>
      <NavLink to='/news' activeClassName={classes.activ}>News</NavLink >
    </div>
    <div className={classes.item}>
      <NavLink to='/music' activeClassName={classes.activ}>Music</NavLink >
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