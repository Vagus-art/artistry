//load token from localstorage (user data)

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

