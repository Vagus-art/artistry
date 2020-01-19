//fetching router, exports fetching functions that use a root uri, so I don't have to copy paste
//for each react component

const ROOT_URI = '/api';
const fetchjson = async (uri)=>{
    const fetched = await fetch(ROOT_URI.concat(uri));
    const fetchedjson = await fetched.json();
    return fetchedjson;
}

export default {
  fetchjson
};
