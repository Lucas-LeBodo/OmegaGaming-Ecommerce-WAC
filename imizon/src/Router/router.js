import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch,} from "react-router-dom";

// import Components
import NavBar from '../Components/NavBar';
import BreadCrumbs from '../Components/BreadCrumbs';


// import page
import Home from '../Pages/User/Home';
import Register from '../Pages/User/Register';
import Login from '../Pages/User/Login';
import Product from '../Pages/User/ProductSheet';
import BestSeller from '../Pages/User/BestSeller';
import Discount from '../Pages/User/Discount';
import Basket from '../Pages/User/Basket';
import Search from '../Pages/User/Search';
import NewArticles from '../Pages/User/NewArticles';
import Tracking from '../Pages/User/Tracking';
import Profil from '../Pages/User/Profil';
import Payment from '../Pages/User/Payment';


import HomeAdmin from '../Pages/Admin/Home';
import CreateArticle from '../Pages/Admin/CreateArticle';
import ShowArticles from '../Pages/Admin/ShowArticles';
import UpdateArticle from '../Pages/Admin/UpdateArticle';
import CreateCategory from '../Pages/Admin/CreateCategory';
import ShowCategories from '../Pages/Admin/ShowCategories';
import UpdateCategory from '../Pages/Admin/UpdateCategory';
import ProtectedRoute from './Components/ProtectedRoute';



// Router

const AppRouter = () => {

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
                    <Route path='/discount'  component={Discount}  exact={true}/>
                    <Route path='/new_articles'  component={NewArticles}  exact={true}/>
                    <Route path='/basket'  component={Basket}  exact={true} />
                    <Route path='/search'  component={Search}  exact={true} />
                    <Route path='/profil/:name'  component={Profil} />
                    <Route path='/profil/:name/update_information' component={Profil} />
                    <Route path='/profil/:name/adresses'  component={Profil} />
                    <Route path='/profil/:name/historic'  component={Profil} />
                    <Route path='/profil/:name/payment'  component={Profil} />
                    <Route path='/historic/:order' component={Tracking} />
                    <Route path='/basket/payment' component={Payment} exact={true}/>
                    

                    {/* Admin Router */}
                    <ProtectedRoute/>
                    <Route path='/admin'  component={HomeAdmin} exact={true} />
                    <Route path='/admin/create_article'  component={CreateArticle} exact={true} />
                    <Route path='/admin/show_articles'  component={ShowArticles} exact={true} />
                    <Route path='/admin/show_article/update/:id' component={UpdateArticle} /> 
                    <Route path='/admin/create_category'  component={CreateCategory} exact={true} />
                    <Route path='/admin/show_category'  component={ShowCategories} exact={true} />
                    <Route path='/admin/show_category/update/:id' component={UpdateCategory} /> 
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
};

export default AppRouter;