import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from "./components/Profile";
import ViewProfile from "./components/ViewProfile";
import Settings from "./components/Settings";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Post from "./components/Post";
import Signup from "./components/Signup";
import { connect } from "react-redux";

//get the user from store's state and set it to this component's props
const mapStateToProps = state => ({
  token: state.token,
  user: state.user
});

function App(props) {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/viewprofile" component={ViewProfile} />
          {props.user && (
            <>
              <Route
                path="/profile"
                render={() => <Profile user={props.user} />}
              />
              <Route path="/settings" component={Settings} />
              <Route path="/post" component={Post} />
            </>
          )}
          {!props.user && (
            <>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </>
          )}
        </Switch>
        {props.user && (
          <Link to="/post">
            <button className="post-btn">+</button>
          </Link>
        )}
      </Router>
    </div>
  );
}

//connect function takes a mapstate and a mapdispatch
//the first gets the store's state and maps it to props
//the second sets a function to interact with the store (called dispatch)
export default connect(mapStateToProps, null)(App);
