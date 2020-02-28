import React, { useState } from "react";
import { withRouter } from "react-router";
import auth from "../authActions";

const Signup = props => {
  //I use component states instead of redux store, because reasons
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //message for error notifications
  const [message, setMessage] = useState("");

  //state setters on input changes
  const onChange = e => {
    switch (e.target.name) {
      case "user":
        setUser(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      default:
        //do nothing
        break;
    }
    console.log(user, password, email);
  };

  //form submit, sends userinfo to server, awaits a message response and a session cookie
  const onSubmit = async e => {
    e.preventDefault();
    let response = await auth.signupJSON("/signup", {
      nickname: user,
      password: password,
      email: email
    });
    if (response.hasOwnProperty("error")) {
      setMessage(response.error);
    } else {
      props.history.replace("/");
    }
  };
  return (
    <div id="form">
      <div id="formscreen">
        <form onSubmit={onSubmit} id="form-form">
          <h1>Sign up</h1>
          <h2>{message}</h2>
          <input
            type="text"
            name="user"
            placeholder="user"
            value={user}
            onChange={onChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={onChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={onChange}
            required
          />
          <input type="submit" value="Sign up" className="form-btn" />
        </form>
      </div>
    </div>
  );
};

//this time I don't have any state to get from the store
export default withRouter(Signup);
