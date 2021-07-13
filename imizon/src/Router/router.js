import React, {Fragment} from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom";


// import Components
import NavBar from '../Components/NavBar';

// import page
import Home from './Pages/User/Home';
import Register from './Pages/User/Register';
import Login from './Pages/User/Login';

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
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
};

export default AppRouter;