import React from "react"
import { BrowserRouter, Redirect, Switch, withRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/redaxStore';
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import { Route } from 'react-router-dom'
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import UsersContainer from "./Components/Users/UsersContainer"
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login"
import { connect } from "react-redux";
import { initializeApp } from './redux/appReducer'
import Preloader from "./Components/Common/Preloader/Preloader";
import { compose } from "redux";


const MessengerContainer = React.lazy(() => import('./Components/Messenger/MessengerContainer'));

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.inishialized) {
      return <Preloader />
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navigation />
        
          <div className='app-wrapper-content'>
          <Switch>
          <Route exact path='/' render={() => <Redirect to = {'./profile'}/>} />
            <Route path='/profile/:userId?' render={() => <React.Suspense fallback={<Preloader />}>
              <div>
                <ProfileContainer />
              </div>
            </React.Suspense>} />
            <Route path='/messenger' render={() =>
              <React.Suspense fallback={<Preloader />}>
                <div>
                  <MessengerContainer />
                </div>
              </React.Suspense>} />
            <Route path='/users' render={() => <UsersContainer />} />
            <Route path='/news' render={() => <News />} />
            <Route path='/music' render={() => <Music />} />
            <Route path='/settings' render={() => <Settings />} />
            <Route path='/login' render={() => <Login />} />
            <Route path='*' render={() => <div> ERROR 404 </div>} />
            </Switch>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  inishialized: state.app.inishialized
})

let AppContainer = compose(withRouter, connect(mapStateToProps, { initializeApp }))(App)

const SocialNetworkApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <AppContainer />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
}


export default SocialNetworkApp