import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import '../Styles/NavBar.scss';

function NavBar(props) {
return (
    <Fragment>
        <div className="logbox">
            <h2>Omega Gaming</h2>
            <div className={'loglist'}>
                <Link to={'/register'} >Register</Link>
                <Link to={'/login'} >Login</Link>
            </div>
        </div>
        <div className={'navbox'}>
            <Link to={'/'} >Home</Link>
            <Link to={'/'} >Page 2</Link>
            <Link to={'/'} >Page 3</Link>
        </div>
    </Fragment>
);
}

export default NavBar;