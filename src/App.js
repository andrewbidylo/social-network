import React from "react"
import {BrowserRouter, withRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/redaxStore';
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import {Route} from 'react-router-dom'
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import MessengerContainer from "./Components/Messenger/MessengerContainer";
import UsersContainer from "./Components/Users/UsersContainer"
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login"
import { connect } from "react-redux";
import {initializeApp} from './redux/appReducer'
import Preloader from "./Components/Common/Preloader/Preloader";
import { compose } from "redux";

class App extends React.Component{
  componentDidMount() {
    this.props.initializeApp()
   }
  render() {
    if (!this.props.inishialized) {
      return <Preloader/>
    }
  return (
    <div className= 'app-wrapper'>
      <HeaderContainer/>
      <Navigation />
      {/* friendsData = {props.state.sideBar.populationFriends} */}
      <div className = 'app-wrapper-content'>
      <Route path = '/profile/:userId?' render = { () => <ProfileContainer/>}/>
      <Route path = '/messenger' render = { () => <MessengerContainer/>}/> 
      <Route path = '/users' render = { () => <UsersContainer/>}/>
      <Route path = '/news' render = { () => <News/>}/>  
      <Route path = '/music' render = { () => <Music/>}/>
      <Route path = '/settings' render = { () => <Settings/>}/> 
      <Route path = '/login' render = { () => <Login/>}/> 
      </div>
    </div>
  )}
  }

  const mapStateToProps = (state) => ({
    inishialized: state.app.inishialized
  })

  let AppContainer = compose (withRouter, connect (mapStateToProps, {initializeApp}))(App)

  const SocialNetworkApp =  (props) => {
    return <BrowserRouter>  
<Provider store = {store}>
  <React.StrictMode>
    <AppContainer/>
  </React.StrictMode>
  </Provider> 
  </BrowserRouter>
  }


export default SocialNetworkApp