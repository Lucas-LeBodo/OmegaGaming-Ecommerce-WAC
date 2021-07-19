import React, {Fragment} from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom";


// import Components
import NavBar from '../Components/NavBar';

// import page
import Home from '../Pages/User/Home';
import Register from '../Pages/User/Register';
import Login from '../Pages/User/Login';
import Product from '../Pages/User/Product';

import ProtectedRoute from './Components/ProtectedRoute'

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
                    <ProtectedRoute path='/product' component={Product} />  
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
};

export default AppRouter;