import React, {Component, Fragment} from 'react';
import {Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import truckImg from '../../Assets/delivery-truck.png';


const tracking = (props) => {
    return(
        <Fragment >
            <Container>
                <Link to={"/profil/"+localStorage.name+"/historic"}>← back to historic</Link>
                <div className="tracking">
                    <h1> Shipping in progress </h1>
                    <p>Command n° {props.match.params.order} .</p>
                    <img src={truckImg} alt="Delivery Trucks" />
                </div> 
                
            </Container>
        </Fragment>
    )
}

export default tracking;