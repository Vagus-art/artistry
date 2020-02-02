import React, { useEffect, useState } from "react";
import Profilepicform from "./Profilepicform";
import { withRouter } from "react-router";
import queryString from "query-string";
import agent from "../agent";

const ViewProfile = props => {
  const [user, setUser] = useState(null);

  const query = queryString.parse(props.location.search);

  useEffect(() => {
    agent.getUser(query.id).then(res => setUser(res));
  }, []);

  console.log(user);
  return (
    <div id="userpage">
      <div id="userprofile">
        <div id="background-img"></div>
        {user && (
          <>
            <img
              src={user.profileimg}
              alt="profile"
              className="navprofile-bigger"
            />
            <h1>{user.nickname}</h1>
            <h2>{user.email}</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(ViewProfile);
