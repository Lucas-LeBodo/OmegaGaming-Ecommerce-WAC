import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import Product from './ProductSheet'


export default class product extends Component {
    render(){
        return(
            <Container >
                <Product />
            </Container>
        )
    }


}