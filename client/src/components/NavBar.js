import React, { useState, useRef, useEffect } from 'react';
import './css/NavBar.css';
import auth from '../authActions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const mapStateToProps = state => ({
  user: state.user
})

const NavBar = (props) => {
    //added hooks to make functional component behave like a class one
    var sidemenu = useRef(null);
    var overlay = useRef(null);
    const [sidemenutriggered,trigger] = useState(false);
    const sidemenutrigger = () =>{
        trigger(!sidemenutriggered);
    }
    useEffect(()=>{
        //imperative animations using sidemenutriggered state
        [sidemenu, overlay] = [sidemenu.current.style, overlay.current.style];
        if(sidemenutriggered){
            sidemenu.left = '0px';
            overlay.opacity = '0.8';
            overlay.display = 'block';
        }
        else{
            sidemenu.left = '-250px';
            overlay.opacity = '0';
            overlay.display = 'none';
        }
    })
    return (
        <>
            <div className="Overlay" ref={overlay} onClick={sidemenutrigger}></div>
            <div className="SideMenu" ref={sidemenu}>
                <ul className="NavBarMenu column">
                    <Link to="/">
                        <li onClick={sidemenutrigger}>Home</li>
                    </Link>
                    <Link to="/profile">
                        <li onClick={sidemenutrigger}>Profile</li>
                    </Link>
                    <Link to="/settings">
                        <li onClick={sidemenutrigger}>Settings</li>
                    </Link>
                    <Link>
                        <li onClick={()=>{auth.logout();sidemenutrigger()}}>Logout</li>
                    </Link>
                </ul>
            </div>
            <div className="NavBar">
                <ul className="NavBarMenu">
                    {!props.user &&
                      <Link to="/">
                        <li>H</li>
                      </Link>
                    }
                    {props.user &&
                      <Link>
                        <li onClick={sidemenutrigger}>H</li>
                      </Link>
                    }
                    <li className="searchli"><input type="text" className="searchinput" name="searchbar" placeholder="search" /></li>
                    { props.user && <Link to="/settings"><li>Settings</li></Link> }
                </ul>
                { !props.user &&
                <ul className="NavBarMenu">
                    <Link to="/login">
                        <li>Log in</li>
                    </Link>
                    <Link to="/signup">
                        <li>Sign up</li>
                    </Link>
                </ul>
              }
            </div>
        </>
    )
}

export default connect(mapStateToProps,null)(NavBar);
