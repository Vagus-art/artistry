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
    <div className="postito">
      <img src={props.post.content} alt="post" />
      <Link to={"/viewprofile?id=".concat(props.post.id)}>
        <h3>{user.nickname}</h3>
      </Link>
      <p>{props.post.description}</p>
      <p>{props.post.date}</p>
    </div>
  );
};

export default Posted;
