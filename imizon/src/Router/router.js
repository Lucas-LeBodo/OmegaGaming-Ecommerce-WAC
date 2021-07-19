import React, {Fragment} from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom";


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

// Router

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <NavBar />
                <Switch>
                    <Route path='/' component={Home} exact={true} />
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} /> 
                    <Route path='/product' component={Product} />
                    <Route path='/admin' component={HomeAdmin} />
                    <Route path='/admin/create_article' component={CreateArticle} />
                    <Route path='/show_articles' component={ShowArticles} />
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
};

export default AppRouter;