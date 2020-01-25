import React, { useState } from "react";
import { withRouter } from "react-router";
import agent from "../agent";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  token: state.token,
  user: state.user
});

const Post = props => {
  const [postContent, setPostContent] = useState("");
  let message = false;
  const onSubmit = e => {
    e.preventDefault();
    const response = agent.postJSON(
      "/posts",
      { nickname: props.user.nickname, content: postContent },
      props.token
    ); // I need to require token validation next
    if (response.hasOwnProperty("error")) {
      message = response.error;
    } else {
      props.history.replace("/");
    }
  };
  return (
    <div className="post">
      <form onSubmit={onSubmit}>
        <textarea
          name="post-content"
          value={postContent}
          onChange={e => setPostContent(e.target.value)}
        />
        <input type="submit" value="Post" />
      </form>
      {message && <h1>{message}</h1>}
    </div>
  );
};

//connectedpost has router props
const connectedPost = withRouter(Post);
export default connect(mapStateToProps, null)(connectedPost);
