import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch,} from "react-router-dom";

// import Components
import NavBar from '../Components/NavBar';
import BreadCrumbs from '../Components/BreadCrumbs';


// import page
import Home from '../Pages/User/Home';
import Register from '../Pages/User/Register';
import Login from '../Pages/User/Login';
import Product from '../Pages/User/ProductSheet'
import BestSeller from '../Pages/User/BestSeller';


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
                <BreadCrumbs />

                <Switch>

                    {/* User Router */}
                    <Route path='/' component={Home} exact={true} />
                    <Route path='/register' component={Register} exact={true} />
                    <Route path='/login' component={Login} exact={true} /> 
                    <Route path='/product/:id' component={Product} />
                    <Route path='/best-seller'  component={BestSeller}  exact={true}/>

                    {/* Admin Router */}
                    <Route path='/admin'  component={HomeAdmin} exact={true} />
                    <Route path='/admin/create_article'  component={CreateArticle} exact={true} />
                    <Route path='/admin/show_articles'  component={ShowArticles} exact={true} />
                    <Route path='/admin/show_article/update/:id' component={UpdateArticle} /> 
                    <ProtectedRoute Auth={auth} username={username} roles={roles[0]} path={pathName}/>

                </Switch>
            </Fragment>
        </BrowserRouter>
    );
};

export default AppRouter;