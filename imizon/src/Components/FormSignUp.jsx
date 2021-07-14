import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './FormSingUp.scss';

export default function FormSignUp () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [ confpassword, setConfPassword] = useState('');
  const submit = () => {
    // fetch a faire a l'api 
  }

    return (
        <Container fluid className="signup">
            <Form>
                <h3>Sign Up</h3>
                <hr id="hr-form"></hr>
                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" onChange={ (event)=>{ setName(event.target.value)}} required/>
                </div>
                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" onChange={ (event)=>{ setLastName(event.target.value)}} required/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"onChange={ (event)=>{ setEmail(event.target.value)}} required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={ (event)=>{ setPassword(event.target.value)}} required/>
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm password" onChange={ (event)=>{ setConfPassword(event.target.value)}} required/>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={ submit } >Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <Link to={'/login'} className="nav-link">sign in?</Link>
                </p>
            </Form>
        </Container>
    )
}