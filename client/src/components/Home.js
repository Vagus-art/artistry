import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import agent from '../agent';

const mapStateToProps = state => ({
    posts: state.posts
});


const mapDispatchToProps = (dispatch) => ({
    getPosts : (payload) => dispatch({type:'GET_POSTS', payload})
});


const Home = (props) => {
    useEffect(()=>{
      props.getPosts(agent.fetchposts());
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
