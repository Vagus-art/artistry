import React from "react";
import Profilepicform from "./Profilepicform";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  user: state.user
});

const Profile = props => {
  console.log(props.user);
  return (
    <div id="userpage">
      <div id="userprofile">
        <div id="background-img"></div>
        {!props.user.profileimg ? (
          <h1>No profile img</h1>
        ) : (
          <img
            src={props.user.profileimg}
            alt="profile"
            className="navprofile-bigger"
          />
        )}
        {/*<Profilepicform />*/}
        <h1>{props.user.nickname}</h1>
        <h2>{props.user.email}</h2>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  null
)(Profile);
