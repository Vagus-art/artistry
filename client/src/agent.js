//fetching router, exports fetching functions that use a root uri, so I don't have to copy paste
//for each react component

const ROOT_URI = '/api';

//generic json get
const getJSON = async (uri)=>{
    const fetched = await fetch(ROOT_URI.concat(uri),{credentials:'include'});
    const fetchedjson = await fetched.json();
    return fetchedjson;
}

//generic json post
const postJSON = async (uri,payload,token)=>{
  //token parameter is optional, if it exists, this function sets it to the authorization header
    try {

      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }

      if (token!==undefined){
        headers['Authorization'] = `Bearer ${token}`
      }

      const fetched = await fetch(ROOT_URI.concat(uri),{
        method:'POST',
        headers,
        body:JSON.stringify(payload)
      });

      //makes a new object with json body and response status
      const fetchedjson = await fetched.json();
      fetchedjson.status = fetched.status;
      return fetchedjson;

    }
    catch(err){
      console.log(err);
    }
}

export default {
  getJSON,
  postJSON,
  ROOT_URI
};
