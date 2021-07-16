import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../Styles/FormSingUp.scss';
import axios from 'axios';

export default function FormSignUp () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const submit = () => {
    // fetch a faire a l'api 
    if (password == confPassword) 
        {
            axios.post('https://localhost:8000/api/users',{
                lastName : lastName, 
                firstName : name,
                email : email,
                password : password
            }
            ).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        }
        // setEmail('');
        // setName('');
        // setLastName('');
        // setPassword('');
        // setConfPassword('');
  }

    return (
        <Container fluid className="signup">
            <Form>
                <h3>Sign Up</h3>
                <hr id="hr-form"></hr>
                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder={name} onChange={ (event)=>{ setName(event.target.value)}} required/>
                </div>
                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder={lastName} onChange={ (event)=>{ setLastName(event.target.value)}} required/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder={email} onChange={ (event)=>{ setEmail(event.target.value)}} required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder={password} onChange={ (event)=>{ setPassword(event.target.value)}} required/>
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder={confPassword} onChange={ (event)=>{ setConfPassword(event.target.value)}} required/>
                </div>

                <div className="btn btn-primary btn-block btn-custom" onClick={ submit } >Sign Up</div>
                <p className="forgot-password text-right">
                    Already registered <Link to={'/login'} className="nav-link">sign in?</Link>
                </p>
            </Form>
        </Container>
    )
}