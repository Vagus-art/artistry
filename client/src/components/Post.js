import React, {useState} from 'react';
import agent from '../agent';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  token: state.token,
  user: state.user
})

const Post = (props) => {
  const [postContent,setPostContent] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    agent.postJSON('/posts',{title:props.user.nickname,content:postContent},props.token) // i was working here
  }
  return(
    <div className="post">
      <form onSubmit={onSubmit}>
        <textarea name="post-content" value={postContent} onChange={(e)=>setPostContent(e.target.value)} />
        <input type="submit" value="Post" />
      </form>
    </div>
  )
}

export default connect(mapStateToProps,null)(Post);
