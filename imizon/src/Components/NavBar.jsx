import React, { Fragment, useEffect, useMemo, useState } from "react";
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import {decode as base64_decode} from 'base-64';
import {FiLogIn, FiUserPlus, FiUser, FiLogOut, FiSearch, FiKey} from "react-icons/fi"
import { MdShoppingCart } from "react-icons/md"
import debounce from 'lodash.debounce';


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

    const [listTitles, setListTitles] = useState([]);
    const [query, setQuery] = useState("");
    const [countArticles, setCountArticles] = useState('')

    useEffect(() => {
        //Count article in basket
        let count_articles = '';
        if(localStorage.jwt) {
                const base64Url = localStorage.jwt.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                let username = JSON.parse(window.atob(base64)).username;

            axios.get('https://localhost:8000/api/baskets/countArticles', {
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
        
        //Take list of articles for debounce
        function getArticles() {
            let page = 1;
            let titles = [];
            axios.get('https://localhost:8000/api/articles?page='+page, {
            }).then((response) => {
                let articles = response.data["hydra:member"];
                articles.forEach(element => {
                    titles.push(
                        element.Title.toLowerCase()
                    )
                });
                setListTitles(titles);
            }).catch((error) => {
                console.log(error);
            })
        }
        getArticles();
    }, [])

    let tabDebounce = [];
    let showDebounce = "";
    if(query !== "") {
        let filteredNames = listTitles.filter((listTitle) => {
            return listTitle.toLowerCase().includes(query.toLowerCase());
        });
        if(filteredNames.length > 0) {
            filteredNames.forEach(element => {
                tabDebounce.push(
                    <div className="debounce-element" key={element}> {element} </div>
                )
            });
        }
        showDebounce = (
            <div className="debounce-result">
                {tabDebounce}
            </div> 
        )
    } else {
        showDebounce = "";
        tabDebounce = [];
    }
    
    const changeHandler = event => {
      setQuery(event.target.value);
    };

    const debouncedChangeHandler = useMemo(
      () => debounce(changeHandler, 1000)
    , []);



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
            admin = <Link to={'/admin'} ><FiKey /> Espace Admin</Link>
        }
    }
         

    //console.log("valeur dans le localstorage ===> ", role)
    //Afficher que si search est non vide ? C'est à toi de voir Lucas !

    return (
        <Fragment>
            <div className="navmenu">
                <div className="logbox">
                    <Link to={'/'} ><h2>Omega Gaming</h2></Link>
                    {showDebounce}
                    <div className="searchBox">
                        <input type="text" className="searchInput" placeholder="Search" onChange={debouncedChangeHandler}/>
                        <Link to="/search"> <button className="searchButton"><FiSearch /></button></Link> 
                    </div>
                    <div className={'loglist'}>
                        <div className="dropdown">
                            <div className="boutonmenuprincipal"><FiUser /></div>
                            <div className="dropdown-child">
                                {user}
                                {admin}
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