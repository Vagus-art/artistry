import {ROOT_URI} from './agent';
import {store} from './index';
import { decodeToken } from './stateStorage';

const OKSTATUS = 200;

//login
const loginJSON = async (uri,payload)=>{
    try {

        const fetched = await fetch(ROOT_URI.concat(uri),{
            method:'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body:JSON.stringify(payload)

        });

        //makes fetched body accesible.
        const response = await fetched.json()

        //persist user data in local storage
        //dispatch user data, so reload isn't necessary
        if(fetched.status===OKSTATUS){
            const token = response.token;
            localStorage.setItem('token',token);
            const user = decodeToken(token);
            store.dispatch({type:'SET_USER',payload:user});
            store.dispatch({type:'LOGIN_SUBMIT',payload:token});
        }

        //returns a new object with body || error and status
        return response;

    }
    catch(err){
        return('Fetch error on login: ',err);
    }
}

//signup
const signupJSON = async (uri,payload)=>{
    try {

        const fetched = await fetch(ROOT_URI.concat(uri),{
            method:'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body:JSON.stringify(payload)

        });

        //makes fetched body accesible.
        const response = await fetched.json()

        //persist user data in local storage
        //dispatch user data, so reload isn't necessary
        let OKSTATUS = 200;
        if(fetched.status===OKSTATUS){
          await loginJSON('/login',{nickname:payload.nickname,password:payload.password});
        }

        //returns a new object with body || error and status
        return response;

    }
    catch(err){
        return('Fetch error on registration: ',err);
    }
}

//logout
const logout = () =>{
    localStorage.removeItem('token');
    store.dispatch({type:'LOGOUT'});
}


//FIX THIS, IT WORKS BUT IT'S UGLY

const updateUser = async (uri,token,user) => {
  const response = await fetch(ROOT_URI+uri,{
    method:'PUT',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({token,user})
  });
  const responsejson = await response.json();
  console.log(response,responsejson);
  console.log('token:',token);
  if (response.status===OKSTATUS){
      const newToken = responsejson.token;
      localStorage.setItem('token',newToken);
      const newUser = decodeToken(newToken);
      store.dispatch({type:'SET_USER',payload:newUser});
      store.dispatch({type:'LOGIN_SUBMIT',payload:newToken});
    }
  }


export default {
    loginJSON,
    logout,
    signupJSON,
    updateUser
}
