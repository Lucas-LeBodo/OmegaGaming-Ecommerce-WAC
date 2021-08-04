import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import {decode as base64_decode} from 'base-64';
import {FiLogIn, FiUserPlus, FiUser, FiLogOut, FiSearch} from "react-icons/fi"
import { MdShoppingCart } from "react-icons/md"

// Import Components
import Navbox from "./Nav/NavBox";

function NavBar(props) {
    let pathname = useLocation().pathname;
    let loginPath = '';
    let registerPath = '';
    let navbox = '';
    let logout ='';
    let jwt = localStorage.jwt
    let nameUser = localStorage.name
    let user = '';
    let admin = '';
    
    const infoUser = (jwt) => {
        let split = jwt.split('.');
        let info = base64_decode(split[1]);
        info = JSON.parse(info);
        
        var infoRole = info.roles
        let role = infoRole[0];
    }

    const [countArticles, setCountArticles] = useState('')

    useEffect(() => {
        let count_articles = '';

        if(localStorage.jwt) {
                const base64Url = localStorage.jwt.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                let username = JSON.parse(window.atob(base64)).username;

            axios.get('http://localhost:8000/api/baskets/countArticles', {
                params: {email: username}
            }).then((response) => {
                count_articles = response.data["hydra:member"].length
                if(count_articles > 0) {
                    setCountArticles(count_articles);
                } else {
                    setCountArticles('')
                }
            }).catch((error) => {
                console.log(error);
            })

        } else {
            if(localStorage.shoppingUserNoLog) {
                let list_id = localStorage.shoppingUserNoLog;
                list_id = list_id.split(" ");
                count_articles = list_id.length;
                if(count_articles > 0) {
                    setCountArticles(count_articles);
                } else {
                    setCountArticles('')
                }
            }
        }
    }, [window.location.pathname])



    // conditional display btn login / register

    // User déconnecté 
    if(pathname === "/login"){
        loginPath = <Link to={'/register'} ><FiUserPlus /> Sign Up</Link>
        registerPath = <Link to={'/login'} ><FiLogIn/> Sign In</Link>
    }
    if(pathname === "/register"){
        registerPath = <Link to={'/login'} ><FiLogIn/> Sign In</Link>
        loginPath = <Link to={'/register'} ><FiUserPlus /> Sign Up</Link>
    }
    if(pathname === "/register"){
        registerPath = <Link to={'/login'} ><FiLogIn/> Sign In</Link>
        loginPath = <Link to={'/register'} ><FiUserPlus /> Sign Up</Link>
    }
    if(pathname === ("/") && !jwt){
        navbox = <Navbox />
        registerPath = <Link to={'/login'} ><FiLogIn/> Sign In</Link>
        loginPath = <Link to={'/register'} ><FiUserPlus /> Sign Up</Link>
    }

    // User connecté
    if(jwt){
        navbox = <Navbox />
        logout = <Link to={'/'}  onClick={() => {localStorage.clear();}}><FiLogOut/> Logout</Link>
        user = nameUser.split(' ')
        user = <Link to={'/profil/'+nameUser} ><FiUser /> {user[0]}</Link>
        // infoUser(jwt)

        let split = jwt.split('.');
        let info = base64_decode(split[1]);
        info = JSON.parse(info);
        if(info.roles["roles"] === "ROLE_ADMIN") {
            admin = <Link to={'/admin'} ><FiUser />Admin</Link>
        }
    }
         

    //console.log("valeur dans le localstorage ===> ", role)

    return (
        <Fragment>
            <div className="navmenu">
                <div className="logbox">
                    <Link to={'/'} ><h2>Omega Gaming</h2></Link>
                    <div className="searchBox">
                        <input type="text" className="searchInput" placeholder="Search"/>
                        <button className="searchButton"><FiSearch /></button>
                    </div>
                    <div className={'loglist'}>
                        <div className="dropdown">
                            <div className="boutonmenuprincipal"><FiUser /></div>
                            <div className="dropdown-child">
                                {admin}
                                {user}
                                {loginPath}
                                {registerPath}
                                {logout}
                            </div>
                        </div>
                        <div className="dropdown">
                            <div className="boutonmenuprincipal"><Link to={'/basket'} ><MdShoppingCart/> {countArticles}</Link></div>
                        </div>
                    </div>
                </div>
                {navbox}
            </div>
        </Fragment>
    );
}

export default NavBar;