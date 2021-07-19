import React, { useState, useEffect, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import '../Styles/NavBar.scss';
import {decode as base64_decode} from 'base-64';
function NavBar(props) {
    let pathname = useLocation().pathname;
    let loginPath = '';
    let registerPath = '';
    let logout ='';
    let panier = '';
    let jwt = localStorage.jwt
    let role = '';
    let nameUser = localStorage.name
    let user = '';
    
    const infoUser = (jwt) => {
        let split = jwt.split('.');
        let info = base64_decode(split[1]);
        info = JSON.parse(info);
        
        var infoRole = info.roles
        role = infoRole[0];
    }

    // conditional display btn login / register
    if(pathname == "/login"){
        loginPath = <Link to={'/register'} >Register</Link>
    }
    if(pathname == "/register"){
        registerPath = <Link to={'/login'} >Login</Link>
    }
    if(pathname == "/" && !jwt){
        registerPath = <Link to={'/login'} >Login</Link>
        loginPath = <Link to={'/register'} >Register</Link>
    }
    if(jwt){
        panier = <Link to={'#'} >Panier</Link>
        logout = <Link to={'/'}  onClick={() => {localStorage.clear();}}>Logout</Link>
         user = nameUser.split(' ')
         user = <Link to={'#'} >{user[0]}</Link>
        infoUser(jwt)
    }

    //console.log("valeur dans le localstorage ===> ", role)

    return (
        <Fragment>
            <div className="logbox">
                <h2>Omega Gaming</h2>
                <div className={'loglist'}>
                    {loginPath}
                    {registerPath}
                    {user}
                    {panier}
                    {logout}
                    
                </div>
            </div>
            <div className={'navbox'}>
                <Link to={'/'} >Home</Link>
                {/* <Link to={'/'} >Page 2</Link>
                <Link to={'/'} >Page 3</Link> */}
            </div>
        </Fragment>
    );
}

export default NavBar;