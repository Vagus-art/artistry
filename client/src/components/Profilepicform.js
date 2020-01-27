import React, { useState, useEffect, useRef } from "react";
import agent from "../agent";
import { connect } from "react-redux";
import filereader from "./functions/filereader";
import auth from "../authActions";

//FIX THIS, IT WORKS BUT IT'S UGLY

const mapStateToProps = state => ({
  token: state.token,
  user: state.user
});

const Profilepicform = props => {
  const [picture, setPicture] = useState();
  let preview = useRef(null);

  useEffect(() => {
    console.log(picture);
    if (picture) {
      preview.current.replaceChild(
        filereader(picture),
        preview.current.firstChild
      );
    }
  }, [picture]);

  const onChange = e => {
    const data = e.target.files[0];
    setPicture(data);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (picture) {
      const profileimg = await agent.imgurUpload(picture);
      console.log(profileimg);
      const updatedUser = { ...props.user, profileimg };
      console.log(updatedUser);
      auth.updateUser("/profileedit", props.token, updatedUser);
    } else {
      alert("choose a picture first!");
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onChange} />
        <input type="submit" />
      </form>
      <div ref={preview}>
        <div />
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  null
)(Profilepicform);
