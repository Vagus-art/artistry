//fetching router, exports fetching functions that use a root uri, so I don't have to copy paste
//for each react component

export const ROOT_URI = "/api";

//generic json get
export const getJSON = async uri => {
  const fetched = await fetch(
    ROOT_URI.concat(uri) /*,{credentials:'include'}*/
  );
  const fetchedjson = await fetched.json();
  return fetchedjson;
};

//generic json post
export const postJSON = async (uri, payload, token) => {
  //token parameter is optional, if it exists, this function sets it to the authorization header
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    if (token !== undefined) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const fetched = await fetch(ROOT_URI.concat(uri), {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });

    //makes a new object with json body and response status
    const fetchedjson = await fetched.json();
    fetchedjson.status = fetched.status;
    return fetchedjson;
  } catch (err) {
    console.log(err);
  }
};

const imgurUpload = async (file) => {
  const response = await fetch('https://api.imgur.com/3/image',{
      method:'post',
      headers:{
        'Authorization':'Client-ID 3d0f6a040d42500'
      },
      body:file
    });
    const json = await response.json();
    const id = json.data.id;
    const responseimg = await fetch('https://api.imgur.com/3/image/'+id,{
      headers:{
        'Authorization':'Client-ID 3d0f6a040d42500'
      }
    });
    const responseimgjson = await responseimg.json()
    return responseimgjson.data.link;
}

export const getUser = id => { 
  const user = getJSON("/user?id=".concat(id));
  return user;
};

export default {
  getJSON,
  postJSON,
  imgurUpload,
  getUser
};
