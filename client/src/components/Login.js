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
  const [message, setMessage] = useState('');

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
  const onSubmit = async () => {
    let response = await agent.loginJSON('/login',{nickname:userLogin,password:passwordLogin});
    if (response.hasOwnProperty('error'))
    setMessage(response.error);
    let OKSTATUS = 200;
    if(response.status==OKSTATUS){
      alert('success');
      
      props.loginSubmit(response.token);
      //dispatch username to redux database, that makes the app component refresh and render the home component
      //props.loginSubmit(response);
    }
    //(agent.checksess()) ? props.loginSubmit(userLogin) : setMessage('error');
  }
  return(
    <div id = 'login'>
    <h1>Log in</h1>
  <h2>{message}</h2>
        <input type='text' name='user' placeholder='user' value={userLogin} onChange={onChange} required/>
        <input type='password' name='password' placeholder='password' value={passwordLogin} onChange={onChange} required/>
        <button onClick={onSubmit}>Log in</button>
    </div>
  )
}

//this time I don't have any state to get from the store
export default connect(()=>({}),mapDispatchToProps)(Login);
