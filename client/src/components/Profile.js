import React from "react";
import Profilepicform from './Profilepicform';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  user: state.user
})

const Profile = (props) => {
  console.log(props.user);
  return (
    <div>
      {!props.user.profileimg ? <h1>No profile img</h1> : <img src={props.user.profileimg} alt="profile" />}
      <Profilepicform />
      <h1>{props.user.nickname}</h1>
      <h2>{props.user.email}</h2>
      <h2>{props.user.id}</h2>
    </div>
  );
}

export default connect(mapStateToProps,null)(Profile);
