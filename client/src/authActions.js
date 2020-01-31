import { ROOT_URI, getUser, postJSON } from "./agent";
import { store } from "./index";
import { decodeToken } from "./stateStorage";

const OKSTATUS = 200;

//login
const loginJSON = async (uri, payload) => {
  try {
    const fetched = await fetch(ROOT_URI.concat(uri), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    //makes fetched body accesible.
    const response = await fetched.json();

    //persist user data in local storage
    //dispatch user data, so reload isn't necessary
    if (fetched.status === OKSTATUS) {
      const token = response.token;
      localStorage.setItem("token", token);
      setUser(token);
      store.dispatch({ type: "LOGIN_SUBMIT", payload: token });
    }

    //returns a new object with body || error and status
    return response;
  } catch (err) {
    return "Fetch error on login: ", err;
  }
};

const setUser = async token => {
  const tokenDecoded = decodeToken(token);
  if (tokenDecoded) {
    const user = getUser(tokenDecoded.id);
    store.dispatch({ type: "SET_USER", payload: user });
  }
};

//signup
const signupJSON = async (uri, payload) => {
  try {
    const fetched = await fetch(ROOT_URI.concat(uri), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    //makes fetched body accesible.
    const response = await fetched.json();

    //persist user data in local storage
    //dispatch user data, so reload isn't necessary
    let OKSTATUS = 200;
    if (fetched.status === OKSTATUS) {
      await loginJSON("/login", {
        nickname: payload.nickname,
        password: payload.password
      });
    }

    //returns a new object with body || error and status
    return response;
  } catch (err) {
    return "Fetch error on registration: ", err;
  }
};

//logout
const logout = () => {
  localStorage.removeItem("token");
  store.dispatch({ type: "LOGOUT" });
};

//FIX THIS, IT WORKS BUT IT'S UGLY

const updateUser = async (uri, token, user) => {
  const response = await fetch(ROOT_URI + uri, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token, user })
  });
  const responsejson = await response.json();
  console.log(response, responsejson);
  if (response.status === OKSTATUS) {
    const newUser = responsejson.user;
    store.dispatch({ type: "SET_USER", payload: newUser });
  }
};

export default {
  loginJSON,
  logout,
  setUser,
  signupJSON,
  updateUser
};
