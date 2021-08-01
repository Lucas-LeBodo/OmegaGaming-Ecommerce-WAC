import React, {useState, useEffect} from 'react'
import { Route, Redirect } from "react-router-dom";
import axios from 'axios'

import HomeAdmin from '../../Pages/Admin/Home';
import CreateArticle from '../../Pages/Admin/CreateArticle';
import ShowArticles from '../../Pages/Admin/ShowArticles';
import UpdateArticle from '../../Pages/Admin/UpdateArticle';
import CreateCategory from '../../Pages/Admin/CreateCategory';

export default function Auth(props){
    const [ok, setOk] = useState("");
    
    let username = '';
    let rolesToken = '';
    let token = localStorage.jwt;
    let auth = false;
    let pathName = window.location.pathname
    let testVerif = "";
    let roleRequest = "";

    if(token){
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        username = JSON.parse(window.atob(base64)).username;
        rolesToken = JSON.parse(window.atob(base64)).roles;
        console.log(rolesToken)
        if(rolesToken["roles"] === "ROLE_ADMIN") {
            auth = true
        } 
    }

    useEffect(() => {
        verifAuth()
    }, [window.location.pathname])

    const verifAuth = async () => {
        if(token) {
            await axios.get('httpss://localhost:8000/api/me', {
                params: {username: username}
            }).then((response) => {
                console.log(response.data.roles)
                roleRequest = response.data.roles["roles"]
    
                console.log(rolesToken)
                console.log(roleRequest)
                console.log(rolesToken["roles"])
                if(rolesToken["roles"] === roleRequest && auth === true){
                    console.log("la")
                    console.log(pathName)

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