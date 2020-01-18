import React, {useEffect} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    posts: state.posts    
});

const fetchposts = async ()=>{
    const fetched = await fetch('http://localhost:3000/api/search');
    const fetchedjson = await fetched.json();
    return fetchedjson.results;
}

const mapDispatchToProps = (dispatch) => ({
    getPosts : (payload) => dispatch({type:'GET_POSTS', payload})
});


const Home = (props) => {
    useEffect(()=>{
        fetchposts().then(data=>props.getPosts(data))
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