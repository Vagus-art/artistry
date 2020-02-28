import React, { useEffect } from "react";
import { connect } from "react-redux";
import agent from "../agent";
import Posted from "./Posted";
import { ReactComponent as RavenDrawing } from "./img/raven-plain.svg";

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
      <div className="home-screen onbig">
        <h1 className="home-title">Welcome to Artistry!</h1>
        <RavenDrawing className="raven-drawing" />
        <div className="home-stars"></div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
