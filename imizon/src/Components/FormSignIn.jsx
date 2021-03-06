import React, {useState, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

import GetTokenInformation from './tools/GetTokenInformation';


export default function FormSignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    
    const submit = () => {
        // fetch a faire a l'api 
        axios.post('https://localhost:8000/authentication_token',{
            email : email,
            password : password
        }
        ).then((response) => {
            localStorage.setItem("jwt", response.data.token);
            parseJwt(response.data.token);
        }).catch((error) => {
        })
    }

    function parseJwt(token) {
        if (!token) { return; }
        let username = GetTokenInformation(false)
        
        axios.get('https://localhost:8000/api/me', {
            params: {username: username}
        }).then((response) => {
            let name = response.data.firstName + " " + response.data.lastName
            localStorage.setItem("name", name);
            let id_user = response.data.id;
            let list_id = localStorage.shoppingUserNoLog;

            if(localStorage.shoppingUserNoLog) {
                list_id = list_id.split(" ");

                list_id.forEach(element => {
                    axios.get('https://localhost:8000/api/articles/'+element, {
                    }).then((response) => {
                        axios.post('https://localhost:8000/api/baskets', {
                            price: parseInt(response.data.Price),
                            idUser: parseInt(id_user),
                            idArticles: parseInt(element),
                        }).then((response) => {
                        }).catch((error) => {
                        })
                        localStorage.removeItem('shoppingUserNoLog');
                    }).catch((error) => {
                    })
                });
            }
            history.push("/");
        }).catch((error) => {
        })
    }

    return (
    <Fragment>
        <div className="background-image">
            <div className="fondu"></div>
        </div>
        <div className={"containers-form"}>
            <div className={"containers-signup"}>
                <h3>Sign In</h3>
                <input type="email" className="signup-form"  placeholder={"Email"}onChange={ (event)=>{ setEmail(event.target.value)}} required/>
                <input type="password" className="signup-form"  placeholder={"Password"} onChange={ (event)=>{ setPassword(event.target.value)}} required/>
                <div type="submit" className="signup-btn" onClick={ submit } >Sign In</div>
            </div>
            <div className={"containers-other"}>
            <h3>You don't have an account ?</h3>  <Link to={'/register'} className="nav-link">Sign Up</Link>
            </div>
        </div>
    </Fragment>
    )
}