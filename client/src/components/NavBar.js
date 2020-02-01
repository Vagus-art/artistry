import React, { useState, useRef, useEffect } from "react";
import "./css/NavBar.css";
import auth from "../authActions";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const mapStateToProps = state => ({
  user: state.user
});

const NavBar = props => {
  //added hooks to make functional component behave like a class one
  var sidemenu = useRef(null);
  var overlay = useRef(null);
  const [sidemenutriggered, trigger] = useState(false);
  const sidemenutrigger = () => {
    trigger(!sidemenutriggered);
  };
  useEffect(() => {
    //imperative animations using sidemenutriggered state
    [sidemenu, overlay] = [sidemenu.current.style, overlay.current.style];
    if (sidemenutriggered) {
      sidemenu.left = "0px";
      overlay.opacity = "0.8";
      overlay.display = "block";
    } else {
      sidemenu.left = "-250px";
      overlay.opacity = "0";
      overlay.display = "none";
    }
  });
  return (
    <>
      <div className="Overlay" ref={overlay} onClick={sidemenutrigger}></div>
      <div className="SideMenu" ref={sidemenu}>
        {props.user && (
          <ul className="NavBarMenu column">
            <Link to="/profile">
              <li onClick={sidemenutrigger}>
                <div className="navprofile-wrapper">
                  <img
                    src={props.user.profileimg}
                    alt="profile"
                    className="navprofile-small"
                  />
                  <p className="navprofile-nickname">{props.user.nickname}</p>
                  <p className="navprofile-email">{props.user.email}</p>
                </div>
              </li>
            </Link>
            <Link to="/">
              <li onClick={sidemenutrigger}>Home</li>
            </Link>
            <Link to="/settings">
              <li onClick={sidemenutrigger}>Settings</li>
            </Link>
            <Link>
              <li
                onClick={() => {
                  auth.logout();
                  sidemenutrigger();
                  props.history.replace("/");
                }}
              >
                Logout
              </li>
            </Link>
          </ul>
        )}
      </div>

      <div className="NavBar">
        <ul className="NavBarMenu">
          {!props.user && (
            <Link to="/">
              <li>H</li>
            </Link>
          )}
          {props.user && (
            <Link>
              <li onClick={sidemenutrigger}>
                <img
                  className="navprofile-small"
                  src={props.user.profileimg}
                  alt="profile"
                />
              </li>
            </Link>
          )}
          <li className="searchli">
            <input
              type="text"
              className="searchinput"
              name="searchbar"
              placeholder="search"
            />
          </li>
        </ul>

        {!props.user && (
          <ul className="NavBarMenu">
            <Link to="/login">
              <li>Log in</li>
            </Link>
            <Link to="/signup">
              <li>Sign up</li>
            </Link>
          </ul>
        )}
      </div>
    </>
  );
};
const connectedNavBar = withRouter(NavBar);
export default connect(mapStateToProps, null)(connectedNavBar);
