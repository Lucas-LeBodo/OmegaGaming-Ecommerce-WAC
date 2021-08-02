import React, { Fragment, useEffect, useMemo, useState } from "react";
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import {decode as base64_decode} from 'base-64';
import {FiLogIn, FiUserPlus, FiUser, FiLogOut, FiSearch} from "react-icons/fi"
import { MdShoppingCart } from "react-icons/md"
import debounce from 'lodash.debounce';


// Import Components
import Navbox from "./Nav/NavBox";

function NavBar(props) {
    const [listTitles, setListTitles] = useState([]);
    const [query, setQuery] = useState("");
    const [countArticles, setCountArticles] = useState('')

    let views;

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
                if(response.data["hydra:view"] !== undefined){
                    views = response.data["hydra:view"];
                }
                
                if(articles !== [] && views !== [] && views !== undefined) {
                    if(views["hydra:last"] !== undefined) {
                        let max = parseInt(views["hydra:last"].substr(-1));

                        for(let i = 2; i < max + 1; i++) {
                            axios.get('https://localhost:8000/api/articles?page='+i, {
                            }).then((response) => {
                                articles = response.data["hydra:member"];
                                articles.forEach(element => {
                                    titles.push(
                                        element.Title.toLowerCase()
                                    )
                                });
                            }).catch((error) => {
                                console.log(error)
                            })
                        }
                    }
                }
                setListTitles(titles);
            }).catch((error) => {
                console.log(error);
            })
        }
        getArticles();
    }, [])

    let pathname = useLocation().pathname;
    let loginPath = '';
    let registerPath = '';
    let navbox = '';
    let logout ='';
    let jwt = localStorage.jwt
    let nameUser = localStorage.name
    let user = '';
    
    const infoUser = (jwt) => {
        let split = jwt.split('.');
        let info = base64_decode(split[1]);
        info = JSON.parse(info);
        
        var infoRole = info.roles
        let role = infoRole[0];
    }

    let filteredNames = listTitles;
    
    if (query !== "") {
        filteredNames = listTitles.filter((listTitle) => {
            return listTitle.toLowerCase().includes(query.toLowerCase());
        });
    }
    
    const changeHandler = event => {
        console.log("je viens ici")
      setQuery(event.target.value);
    };

    const debouncedChangeHandler = useMemo(
      () => debounce(changeHandler, 800)
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
        user = <Link to={'#'} ><FiUser /> {user[0]}</Link>
        infoUser(jwt)
    }
         

    //console.log("valeur dans le localstorage ===> ", role)
    //Afficher que si search est non vide ? C'est à toi de voir Lucas !

    return (
        <Fragment>
            <div className="navmenu">
                <div className="logbox">
                    <Link to={'/'} ><h2>Omega Gaming</h2></Link>
                    {filteredNames.map(name => <div key={name}>{name}</div>)}

                    <div className="searchBox">
                        <input type="text" className="searchInput" placeholder="Search" onChange={debouncedChangeHandler}/>
                        <button className="searchButton"><FiSearch /></button>
                    </div>
                    <div className={'loglist'}>
                        <div className="dropdown">
                            <div className="boutonmenuprincipal"><FiUser /></div>
                            <div className="dropdown-child">
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