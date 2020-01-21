import agent from './agent';
import {store} from './index';
import { decodeToken } from './stateStorage';

const ROOT_URI = agent.ROOT_URI;

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

        //makes a new object with json body and response status.
        const response = await fetched.json()
     
        //persist user data in local storage
        //dispatch user data, so reload isn't necessary
        let OKSTATUS = 200;
        if(fetched.status===OKSTATUS){
            const token = response.token;
            localStorage.setItem('token',token);
            const user = decodeToken(token);
            store.dispatch({type:'SET_USER',payload:user})
            store.dispatch({type:'LOGIN_SUBMIT',payload:token});          
        }
        
        //returns a new object with body || error and status
        return response;

    }
    catch(err){
        return('Fetch error on login: ',err);
    }
}

//logout
const logout = () =>{
    localStorage.removeItem('token');
    store.dispatch({type:'LOGOUT'});
    window.location.reload();
}

export default {
    loginJSON,
    logout
}