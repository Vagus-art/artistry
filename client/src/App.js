import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Profile from './components/Profile';
import Settings from './components/Settings';
import NavBar from './components/NavBar';
import Home from './components/Home';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user
})

function App(props) {
  return (
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
  )
}

export default connect(mapStateToProps,()=>({}))(App);
