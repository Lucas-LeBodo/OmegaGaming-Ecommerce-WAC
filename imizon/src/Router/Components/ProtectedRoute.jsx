import React, {useState, useEffect} from 'react'
import { Route, Redirect } from "react-router-dom";
import axios from 'axios'

import HomeAdmin from '../../Pages/Admin/Home';
import CreateArticle from '../../Pages/Admin/CreateArticle';
import ShowArticles from '../../Pages/Admin/ShowArticles';
import UpdateArticle from '../../Pages/Admin/UpdateArticle';
import CreateCategory from '../../Pages/Admin/CreateCategory';
import ShowCategories from '../../Pages/Admin/ShowCategories';
import UpdateCategory from '../../Pages/Admin/UpdateCategory';

import GetTokenInformation from '../../Components/tools/GetTokenInformation';

export default function Auth(){
    const [ok, setOk] = useState("");
    
    let username = '';
    let rolesToken = '';
    let token = localStorage.jwt;
    let auth = false;
    let pathName = window.location.pathname
    let roleRequest = "";
    if(token){
        let data = GetTokenInformation(true)
        rolesToken = data.rolesToken
        username = data.username
        if(rolesToken["roles"] === "ROLE_ADMIN") {
            auth = true
        } 
    }

    useEffect(() => {
        verifAuth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.pathname])

    const verifAuth = async () => {
        if(token) {
            await axios.get('https://localhost:8000/api/me', {
                params: {username: username}
            }).then((response) => {
                roleRequest = response.data.roles["roles"]

                if(rolesToken["roles"] === roleRequest && auth === true){
                    if(pathName.includes("update") === true) {
                        setOk(<Route path={"/admin/show_article/update/:id"} component={UpdateArticle} />)
                    } else {
                        //ici on rajoute les route qui doivent etre pour l'admin
                       let route = 
                       {  
                           "/admin":  <Route exact path="/admin" component={HomeAdmin} />,
                           "/admin/create_article":  <Route exact path="/admin/create_article" component={CreateArticle} />,
                           "/admin/show_articles":  <Route exact path="/admin/show_articles" component={ShowArticles} />,
                           "/admin/show_article/update/:id": <Route path='/admin/show_article/update/:id' component={UpdateArticle} />,
                           "/admin/create_category": <Route path='/admin/create_category'  component={CreateCategory} exact={true} />,
                           "/admin/show_category": <Route path='/admin/show_category'  component={ShowCategories} exact={true} />,
                           "/admin/show_category/update/:id": <Route path='/admin/show_category/update/:id' component={UpdateCategory} />, 
                       }
                       setOk(route[pathName])       
                    }
                }
                else{
                    setOk( <Redirect to={'/'}/> ) 
                }
            })
        } else {
            setOk( <Redirect to={'/'}/> ) 
        }
    } 
   return <div>{ok}</div>
}