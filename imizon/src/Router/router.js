import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch,} from "react-router-dom";
import axios from 'axios';

// import Components
import NavBar from '../Components/NavBar';
// import BreadCrumbs from '../Components/BreadCrumbs';


// import page
import Home from '../Pages/User/Home';
import Register from '../Pages/User/Register';
import Login from '../Pages/User/Login';
import Product from '../Pages/User/ProductSheet'
import BestSeller from '../Pages/User/BestSeller';
import Discount from '../Pages/User/Discount';
import Basket from '../Pages/User/Basket';
import Search from '../Pages/User/Search';
import Profil from '../Pages/User/Profil';


import HomeAdmin from '../Pages/Admin/Home';
import CreateArticle from '../Pages/Admin/CreateArticle';
import ShowArticles from '../Pages/Admin/ShowArticles';
import UpdateArticle from '../Pages/Admin/UpdateArticle';
import CreateCategory from '../Pages/Admin/CreateCategory';
// import ProtectedRoute from './Components/ProtectedRoute';



// Router

const AppRouter = (props) => {

    const [countArticles, setCountArticles] = useState('')

    useEffect(() => {
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
    }, [window.location.pathname])


    return (
        <BrowserRouter>
            <Fragment>
                <NavBar />
                {/* <BreadCrumbs /> */}

                <Switch>

                    {/* User Router */}
                    <Route path='/' component={Home} exact={true} />
                    <Route path='/register' component={Register} exact={true} />
                    <Route path='/login' component={Login} exact={true} /> 
                    <Route path='/product/:id' component={Product} />
                    <Route path='/best-seller'  component={BestSeller}  exact={true}/>
                    <Route path='/discount'  component={Discount}  exact={true}/>
                    <Route path='/basket'  component={Basket}  exact={true} />
                    <Route path='/search'  component={Search}  exact={true} />
                    <Route path='/profil/:name'  component={Profil} />
                    

                    {/* Admin Router */}
                    {/* <ProtectedRoute/> */}
                    <Route path='/admin'  component={HomeAdmin} exact={true} />
                    <Route path='/admin/create_article'  component={CreateArticle} exact={true} />
                    <Route path='/admin/show_articles'  component={ShowArticles} exact={true} />
                    <Route path='/admin/create_category'  component={CreateCategory} exact={true} />
                    <Route path='/admin/show_article/update/:id' component={UpdateArticle} /> 

                </Switch>
            </Fragment>
        </BrowserRouter>
    );
};

export default AppRouter;