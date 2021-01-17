import React from "react"
import './App.css';
import Header from './Components/Header/Header'
import Navigation from './Components/Navigation/Navigation'

import {Route} from 'react-router-dom'
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import MessengerContainer from "./Components/Messenger/MessengerContainer";
import UsersContainer from "./Components/Users/UsersContainer"
import ProfileContainer from "./Components/Profile/ProfileContainer";



const App = (props) => {

  return (
    <div className= 'app-wrapper'>
      <Header/>
      <Navigation />
      {/* friendsData = {props.state.sideBar.populationFriends} */}
      <div className = 'app-wrapper-content'>
      <Route path = '/profile/:userId?' render = { () => <ProfileContainer/>}/>
      <Route path = '/messenger' render = { () => <MessengerContainer/>}/> 
      <Route path = '/users' render = { () => <UsersContainer/>}/>
      <Route path = '/news' render = { () => <News/>}/>
      <Route path = '/music' render = { () => <Music/>}/>
      <Route path = '/settings' render = { () => <Settings/>}/> 
      </div>
    </div>
  )}


export default App;
