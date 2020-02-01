import React, { useEffect } from "react";
import { connect } from "react-redux";
import agent from "../agent";
import Posted from "./Posted";

//get posts from redux
const mapStateToProps = state => ({
  posts: state.posts
});

//set dispatch function to props
const mapDispatchToProps = dispatch => ({
  getPosts: payload => dispatch({ type: "GET_POSTS", payload })
});

const Home = props => {
  const feedURI = "/";
  useEffect(() => {
    //fetch feed contents and dispatch them to redux store
    props.getPosts(agent.getJSON(feedURI));
  }, []);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Home</h1>
      <div className="posts-wrapper">
        {props.posts.length > 0 ? (
          props.posts.map(post => {
            return <Posted post={post} />;
          })
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
