import React, {useState, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

export default function FormSignUp () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const history = useHistory();

    const submit = () => {
    // fetch a faire a l'api 
    if (password === confPassword) {
            axios.post('https://localhost:8000/api/users',{
                lastName : lastName, 
                firstName : name,
                email : email,
                password : password
            }
            ).then((response) => {
                history.push("/login");
            }).catch((error) => {
            })
        }
        setEmail('');
        setName('');
        setLastName('');
        setPassword('');
        setConfPassword(''); 
    }

    return (
        <Fragment>
            <div className="background-image">
                <div className="fondu"></div>
            </div>
            <div className={"containers-form"}>
                <div className={"containers-signup"}>
                    <h3>Sign Up</h3>
                    <input type="text" className="signup-form" placeholder={"Fisrt Name"} name={name} onChange={ (event)=>{ setName(event.target.value)}} required/>
                    <input type="text" className="signup-form" placeholder={"Last Name"} name={lastName} onChange={ (event)=>{ setLastName(event.target.value)}} required/>
                    <input type="email" className="signup-form" placeholder={"Email"} name={email} onChange={ (event)=>{ setEmail(event.target.value)}} required/>
                    <input type="password" className="signup-form" placeholder={"Password"} name={password} onChange={ (event)=>{ setPassword(event.target.value)}} required/>
                    <input type="password" className="signup-form" placeholder={"Confirm Password"} name={confPassword} onChange={ (event)=>{ setConfPassword(event.target.value)}} required/>
                    <div className="signup-btn" onClick={ submit } >Sign Up</div>
                </div>
                <div className={"containers-other"}>
                    <h3>Already registered ?</h3> <Link to={'/login'} className="nav-link">Sign In</Link>
                </div>
            </div>
        </Fragment>
    )
}