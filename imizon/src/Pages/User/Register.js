import React, { useEffect, useState, Fragment } from "react"
import Form from 'react-bootstrap/form';
import Button from 'react-bootstrap/button';
import axios from 'axios';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            passwordConfirm: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value
        })
        console.log(this.state)
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.password == this.state.passwordConfirm) 
        {
            axios.post('https://127.0.0.1:8000/api/users',
                {
                    LastName: this.state.lastName,  
                    FirstName: this.state.firstName,
                    Email: this.state.email,
                    Password: this.state.password
                }
            ).then(res => {
                console.log(res.data);
            });
        }

        this.setState({
            login: "",
            password: "",
            email: ""
        })
    }

    render() {
        return (
            <Fragment>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" value={this.state.email} placeholder="Enter email" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="firstName" placeholder="FirstName" value={this.state.firstName} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastName" placeholder="LastName" value={this.state.lastName} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPasswordConfirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" name="passwordConfirm" placeholder="PasswordConfirm" value={this.state.passwordConfirm} onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Register
                    </Button>
                </Form>
            </Fragment>
        )
    }
}

export default Register
