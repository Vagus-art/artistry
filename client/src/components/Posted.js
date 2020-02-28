import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import agent from "../agent";

const Posted = props => {
  const [user, setUser] = useState({
    nickname: "..."
  });
  useEffect(() => {
    agent.getUser(props.post.id).then(res => setUser(res));
  }, []);
  return (
    <div className="postito" style={{backgroundImage:`url(${props.post.content})`}}>
      <div className="post-overlay" />
      <Link to={"/viewprofile?id=".concat(props.post.id)}>
        <div className="post-nickname">
          <img className="navprofile-xsmall postprofile" src={user.profileimg} alt="p"/>
          <h5>{user.nickname}</h5>
        </div>
      </Link>
      <p className="post-date">{props.post.date}</p>
    </div>
  );
};

export default Posted;
