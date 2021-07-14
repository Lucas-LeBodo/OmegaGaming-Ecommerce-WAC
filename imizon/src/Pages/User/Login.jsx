import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FormSignIn from '../../Components/FormSignIn'
import '../../Components/FormSingUp.scss';

export default class login extends Component {
    render(){
        return(
            <Container >
                <FormSignIn/>
            </Container>
        )
    }


}