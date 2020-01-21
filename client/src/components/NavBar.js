import React, { useState, useRef, useEffect } from 'react';
import './css/NavBar.css';
import auth from '../authActions';
import {Link} from 'react-router-dom';

export default function NavBar() {   
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
            <div className="Overlay onsmall" ref={overlay} onClick={sidemenutrigger}></div>
            <div className="SideMenu onsmall" ref={sidemenu}>
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
                    <Link to="/">
                    <li className="onbig">Home</li>
                    </Link>
                    <Link to="/profile">
                    <li className="onbig">Profile</li>
                    </Link>
                    <Link to="/settings">
                    <li className="onbig">Settings</li>
                    </Link>
                    <li className="onbig" onClick={auth.logout}>Logout</li>
                    <li className="onsmall" onClick={sidemenutrigger}>Menu</li>
                </ul>
            </div>
        </>
    )
}