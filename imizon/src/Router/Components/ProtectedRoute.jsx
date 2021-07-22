import React, {useState, useEffect} from 'react'
import { Route, Redirect } from "react-router-dom";
import axios from 'axios'

import Product from '../../Pages/User/Product';
import Login from '../../Pages/User/Login';


export default function Auth(props){
    let auth = props.Auth
    let role = props.roles;
    let data = "";
    let username = props.username;
    let testVerif = ""
    const [ok, setOk ] = useState("");
    let pathName = props.path
    useEffect(() => {
        verifAuth()
    }, [])

    const verifAuth = async () => {
        const response = await  axios.get('https://localhost:8000/api/me', {
            params: {username: username}
        })
        data = await response.data.roles[0]
        testVerif = await test()
    } 


    const test = async () => {
        // console.log("ici =>>>", role, data)
        if(role === data && auth === true){
             console.log("la")
             //ici on rajoute les route qui doivent etre pour l'admin
            let route = 
            {  
                "/product":  <Route path="/product" component={Product} />
            }
            console.log(route[pathName])
            setOk(route[pathName])       
        }
        else{
            
            setOk( <Redirect to={'/'}/> ) 
        }
    }
   return <div>{ok}</div>
   

    
    
    
}