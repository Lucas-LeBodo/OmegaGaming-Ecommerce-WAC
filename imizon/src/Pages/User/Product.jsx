import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import Product from '../../Components/ProductSheet'


export default class product extends Component {
    render(){
        return(
            <Container >
                <Product/>
            </Container>
        )
    }


}