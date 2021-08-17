import React, {Component, Fragment} from 'react';
import {Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import truckImg from '../../Assets/delivery-truck.png';

export default class tracking extends Component {
    render(){
        return(
            <Fragment >
                <Container>
                    <Link to={"/"}>← back to home</Link>
                    <div className="tracking">
                        <h1> Shipping in progress </h1>
                        <img src={truckImg} alt="Delivery Trucks" />
                    </div> 
                    
                </Container>
            </Fragment>
        )
    }


}