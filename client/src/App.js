import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Profile from './components/Profile';
import Settings from './components/Settings';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import { connect } from 'react-redux';
import agent from './agent';

//get the user from store's state and set it to this component's props
const mapStateToProps = state => ({
  user: state.user,
  logged: state.logged
});

//this dispatch fetches a boolean that defines if the app has a session
const mapDispatchToProps = dispatch => ({
  checkLog : (payload) => dispatch({type:'CHECK_LOG', payload})
})

function App(props) {
  useEffect(()=>{
    props.checkLog(agent.checksess());
  },[])
    if (props.logged){
      return(
      <div className="App">
      <Router>
            <NavBar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/profile' render={()=><Profile user={props.user} />} />
              <Route path='/settings' component={Settings} />
            </Switch>
        </Router>
        </div>
    )}
      else {
        return(
          <div className="App">
          <Login/>
          </div>
        )
      }
}

//connect function takes a mapstate and a mapdispatch
//the first gets the store's state and maps it to props
//the second sets a function to interact with the store (called dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(App);
