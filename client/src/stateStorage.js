//load token from localstorage (user data)
import jwt from 'jsonwebtoken';

export const loadToken = () => {
    try{
        const token = localStorage.getItem('token');
        if (token===null){
            return undefined;
        }
        return token;
    }
    catch(err){
        return undefined;
    }
}

export const decodeToken = (token) => {
    if(token){
        return jwt.decode(token);
    }
    else{
        return null;
    }
}

