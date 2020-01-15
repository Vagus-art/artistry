import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Profile from './components/Profile';
import Settings from './components/Settings';
import NavBar from './components/NavBar';
import Home from './components/Home';


function App() {
  return (
    <div className="App">
      <Router>
            <NavBar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/profile' component={Profile} />
              <Route path='/settings' component={Settings} />
            </Switch>
          </Router>
    </div>
  )
}

export default App;