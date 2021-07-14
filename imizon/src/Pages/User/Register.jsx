import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
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