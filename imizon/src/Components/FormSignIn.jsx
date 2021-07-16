import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './FormSingUp.scss';
import axios from 'axios';

export default function FormSignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const submit = () => {
        // fetch a faire a l'api 
        axios.post('https://localhost:8000/authentication_token',{
                email : email,
                password : password
            }
            ).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    
    }

    return (
        <Container fluid className="signup">
            <Form>
                <h3>Sign In</h3>
                <hr id="hr-form"></hr>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"onChange={ (event)=>{ setEmail(event.target.value)}} required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={ (event)=>{ setPassword(event.target.value)}} required/>
                </div>

                <div type="submit" className="btn btn-block btn-custom" onClick={ submit } >Sign Up</div>
                <p className="forgot-password text-right">
                    <Link to={'/register'} className="nav-link">sign up</Link>
                </p>
            </Form>
        </Container>
    )
}