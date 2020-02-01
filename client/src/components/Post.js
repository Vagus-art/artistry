import React, { useState } from "react";
import { withRouter } from "react-router";
import agent from "../agent";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  token: state.token,
  user: state.user
});

const Post = props => {
  const [postContent, setPostContent] = useState();
  const [postDescription, setPostDescription] = useState("");

  let message = false;

  const onChange = e => {
    const file = e.target.files[0];
    setPostContent(file);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const content = await agent.imgurUpload(postContent);
    const response = agent.postJSON(
      "/posts",
      { id: props.user.id, content: content, description: postDescription },
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
          value={postDescription}
          onChange={e => setPostDescription(e.target.value)}
        />
        <input type="file" onChange={onChange} required />
        <input type="submit" value="Post" />
      </form>
      {message && <h1>{message}</h1>}
    </div>
  );
};

//connectedpost has router props
const connectedPost = withRouter(Post);
export default connect(
  mapStateToProps,
  null
)(connectedPost);
