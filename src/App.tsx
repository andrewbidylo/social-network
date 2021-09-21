import React from "react"
import { BrowserRouter, Redirect, Switch, withRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store, { AppStateType } from './redux/redaxStore';
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import { Route } from 'react-router-dom'
import Settings from "./Components/Settings/Settings";
import { Users } from "./Components/Users/Users"
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import { Login } from "./Components/Login/Login"
import { connect } from "react-redux";
import { initializeApp } from './redux/appReducer'
import Preloader from "./Components/Common/Preloader/Preloader";
import { compose } from "redux";
import WeatherPage from "./Pages/Chat/WeatherPage";
import {Footer} from './Footer/Footer'



const MessengerContainer = React.lazy(() => import('./Components/Messenger/MessengerContainer'))
const ChatPage = React.lazy(() => import('./Pages/Chat/ChatPage'));

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = { initializeApp: () => void }

class App extends React.Component<MapStatePropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.inishialized) {
      return <Preloader />
    }
    return ( <div>
      <div className='app-wrapper'>
        <HeaderContainer />
        <div className='app-wrapper-content'>
        <Navigation />
          <Switch>
            <Route exact path='/' render={() => <Redirect to={'./profile'} />} />
            <Route path='/profile/:userId?' render={() => <React.Suspense fallback={<Preloader />}>
              <div>
                <ProfileContainer />
              </div>
            </React.Suspense>} />
            <Route path='/chat' render={() =>
              <React.Suspense fallback={<Preloader />}>
                <div>
                  <ChatPage />
                </div>
              </React.Suspense>} />
            <Route path='/users' render={() => <Users />} />
            <Route path='/todo' render={() =>
              <React.Suspense fallback={<Preloader />}>
                <div>
                  <MessengerContainer />
                </div>
              </React.Suspense>} />
            <Route path='/weather' render={() => <WeatherPage />} />
            <Route path='/settings' render={() => <Settings />} />
            <Route path='/login' render={() => <Login />} />
            <Route path='*' render={() => <div> ERROR 404 </div>} />
          </Switch>
        </div>
        <div className='footer'>
 <Footer/> 
         </div>
      </div>

         </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  inishialized: state.app.inishialized
})

let AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App)

const SocialNetworkApp: React.FC = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <AppContainer />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
}


export default SocialNetworkApp