import React, {Fragment, useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch,} from "react-router-dom";

// import Components
import NavBar from '../Components/NavBar';

// import page
import Home from '../Pages/User/Home';
import Register from '../Pages/User/Register';
import Login from '../Pages/User/Login';
import Product from '../Pages/User/Product';
import HomeAdmin from '../Pages/Admin/Home';
import CreateArticle from '../Pages/Admin/CreateArticle';
import ShowArticles from '../Pages/Admin/ShowArticles';
import UpdateArticle from '../Pages/Admin/UpdateArticle';

import ProtectedRoute from './Components/ProtectedRoute'

// Router

const AppRouter = (props) => {
    let token = localStorage.jwt
    let auth = false
    let roles = ''
    let username
    let pathName = window.location.pathname;
    if(token){
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        username = JSON.parse(window.atob(base64)).username;
        roles = JSON.parse(window.atob(base64)).roles;
        if(roles[0] === "ROLE_ADMIN") {
            auth = true
        } 
    }
    
    // console.log("dans le routeur ", auth)
    return (
        <BrowserRouter>
            <Fragment>
                <NavBar />
                <Switch>
                    <Route path='/' component={Home} exact={true} />
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} /> 
                    <Route path='/register' exact component={Register} />
                    <Route path='/login' exact component={Login} /> 
                    <Route path='/product' exact component={Product} />
                    <Route path='/admin' exact component={HomeAdmin} />
                    <Route path='/admin/create_article' exact component={CreateArticle} />
                    <Route path='/admin/show_articles' exact component={ShowArticles} />
                    <Route path='/admin/show_article/update/:id' component={UpdateArticle} /> 
                    <ProtectedRoute Auth={auth} username={username} roles={roles[0]} path={pathName}/>
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
};

export default AppRouter;