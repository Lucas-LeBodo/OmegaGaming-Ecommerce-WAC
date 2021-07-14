import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";


function NavBar(props) {
return (
    <Fragment>
        <h2>Welcome to React Router Tutorial</h2>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
                <li><Link to={'/'} className="nav-link"> Home </Link></li>
                <li><Link to={'/register'} className="nav-link">Register</Link></li>
                <li><Link to={'/login'} className="nav-link">Login</Link></li>
            </ul>
        </nav>
        <hr />
    </Fragment>
);
}

export default NavBar;