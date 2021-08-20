import React, {useState, useEffect} from 'react'
import { Route, Redirect } from "react-router-dom";
import axios from 'axios'

import HomeAdmin from '../../Pages/Admin/Home';
import CreateArticle from '../../Pages/Admin/CreateArticle';
import ShowArticles from '../../Pages/Admin/ShowArticles';
import UpdateArticle from '../../Pages/Admin/UpdateArticle';
import CreateCategory from '../../Pages/Admin/CreateCategory';

import GetTokenInformation from '../../Components/tools/GetTokenInformation';

export default function Auth(){
    const [ok, setOk] = useState("");
    
    let username = '';
    let rolesToken = '';
    let token = localStorage.jwt;
    let auth = false;
    let pathName = window.location.pathname
    let roleRequest = "";

    
    useEffect(() => {
        if(token){
            let data = GetTokenInformation(true)
            rolesToken = data.rolesToken
            username = data.username
    
            if(rolesToken["roles"] === "ROLE_ADMIN") {
                auth = true
            } 
        }
        verifAuth()
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
                           "/admin/show_articles":  <Route exact path="/admin/show_articles" component={ShowArticles} />,
                           "/admin/create_article":  <Route exact path="/admin/create_article" component={CreateArticle} />,
                           "/admin/createCategory": <Route path='/admin/createCategory'  component={CreateCategory} exact={true} />,
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