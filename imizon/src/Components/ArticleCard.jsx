// Import Libs 
import React, { Fragment } from "react";
import { IoEye } from "react-icons/io5";
import {Link} from 'react-router-dom';


function Card(props) {
    let discountPrice = '';
    let newPrice = '';

    if(props.discount !== null && props.discount !== 0) {
        newPrice = props.price * props.discount / 100
        discountPrice = (
            <div>
                <span className={"card-price"} key={"span "+ props.id}><del>{props.price} €</del></span>
                <span className={"card-price"} key={"span Promo "+ props.id}> {props.price - newPrice} € </span>
            </div>
        )
    } else {
        discountPrice = (
            <span className={"card-price"} key={"span "+ props.id}> {props.price} € </span>
        )
    }

return (
    <Fragment>
        <div className={"card"} key={"div1"+ props.id}>
            <div className={"card-header"} key={"div2"+ props.id}>
                <img src={props.image} alt={"alt image"+props.id} key={props.image} />
            </div>
            <div className={"card-body"} key={"div3"+ props.id}>
                {discountPrice}
                <h4 key={"Title "+ props.title}> {props.title} </h4>
                <p key={"p"+ props.description}> {props.description} </p>
                <div className={"card-btn"} key={"div4"+ props.id}>
                    <Link to={'product/'+props.id} id={props.id} key={"Link"+ props.id}><IoEye/></Link>
                </div>
            </div>
        </div>
    </Fragment>
);
}

export default Card;