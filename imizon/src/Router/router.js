import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch,} from "react-router-dom";

// import Components
import NavBar from '../Components/NavBar';

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
                    <Route path='/product/:id' component={Product} />
                    <Route path='/best-seller' exact component={BestSeller} />

                    <ProtectedRoute/>
                    <Route path='/admin' exact component={HomeAdmin} />
                    <Route path='/admin/create_article' exact component={CreateArticle} />
                    <Route path='/admin/show_articles' exact component={ShowArticles} />
                    <Route path='/admin/show_article/update/:id' component={UpdateArticle} /> 
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
};

export default AppRouter;