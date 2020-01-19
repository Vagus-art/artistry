import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import agent from '../agent';

//get posts from redux
const mapStateToProps = state => ({
    posts: state.posts
});

//set dispatch function to props
const mapDispatchToProps = (dispatch) => ({
    getPosts : (payload) => dispatch({type:'GET_POSTS', payload})
});


const Home = (props) => {
    const feedURI = '/search'
    useEffect(()=>{
      //fetch feed contents and dispatch them to redux store
      props.getPosts(agent.fetchjson(feedURI));
    },[])
    return (
        <div>
            <h1>Home</h1>
            {   props.posts ? (props.posts.map(post=>{
                    return(
                        <div>
                            <h1>{post.title}</h1>
                            <p>{post.content}</p>
                        </div>
                    )
                })) : (<h1>Loading</h1>)
            }
        </div>
    )
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);
