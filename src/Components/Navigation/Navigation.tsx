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
      <NavLink to='/weather' activeClassName={classes.activ}>Weather</NavLink >
    </div>
  </nav>


  )
};

export default Navigation;