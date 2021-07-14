import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FormSignUp from '../../Components/FormSignUp'
import '../../Components/FormSingUp.scss';

export default class register extends Component {
    render(){
        return(
            <Container >
                <FormSignUp/>
            </Container>
        )
    }


}