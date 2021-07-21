import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import FormSignIn from '../../Components/FormSignIn'

export default class login extends Component {
    render(){
        return(
            <Container >
                <FormSignIn/>
            </Container>
        )
    }


}