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
const postJSON = async (uri,payload)=>{
    try {
    const fetched = await fetch(ROOT_URI.concat(uri),{
      method:'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    });
    const fetchedjson = await fetched.json();
    return fetchedjson;
    }
    catch(err){
      console.log(err);
    }
}

//check if user is logged in
const checksess = async ()=>{
    return await fetch(ROOT_URI + '/checksess',{credentials:'include'});
}

export default {
  getJSON,
  postJSON,
  checksess
};
