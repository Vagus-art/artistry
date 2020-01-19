import React,{useState} from 'react';
import {connect} from 'react-redux';
import agent from '../agent';

//submits username to redux
const mapDispatchToProps = (dispatch) => ({
  loginSubmit : (payload) => dispatch({type:'LOGIN_SUBMIT',payload})
})

const Login = (props)=>{

  //I use component states instead of redux store, because reasons
  const [userLogin, setUserLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  //message for error notifications
  const [message, setMessage] = useState('no message');

  //state setters on input changes
  const onChange = (e) => {
    switch(e.target.name){
      case 'user':
      setUserLogin(e.target.value);
      break;
      case 'password':
      setPasswordLogin(e.target.value);
      break;
    }
    console.log(userLogin, passwordLogin);
  }

  //form submit, sends userinfo to server, awaits a message response and a session cookie
  const onSubmit = (e) => {
    e.preventDefault();
    agent.postJSON('/login',{user:userLogin,password:passwordLogin});
    (agent.checksess()) ? props.loginSubmit(userLogin) : setMessage('error');
  }
  return(
    <div id = 'login'>
    <h1>{message}</h1>
      <form onSubmit={onSubmit}>
        <input type='text' name='user' placeholder='user' value={userLogin} onChange={onChange} required/>
        <input type='password' name='password' placeholder='password' value={passwordLogin} onChange={onChange} required/>
        <input type='submit' name='submit' value='Log in' />
      </form>
    </div>
  )
}

//this time I don't have any state to get from the store
export default connect(()=>({}),mapDispatchToProps)(Login);
