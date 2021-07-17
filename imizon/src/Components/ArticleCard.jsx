// Import Libs 
import React, { useState, useEffect, Fragment } from "react";
import { IoEye } from "react-icons/io5";

// Import Styles 
import '../Styles/Card.scss';

// Import Images
import image from '../Assets/pc1.jpg';


function Card(props) {
return (
    <Fragment>
        <div className={"card"}>
            <div className={"card-header"}>
                <img src={image} alt="rover" />
            </div>
            <div className={"card-body"}>
                <span className={"card-price"}>999.99€</span>
                <h4> AORUS GAMING 5.0hz 8vCores</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, quam recusandae consectetur quod velit maiores vero hic similique tempora, totam amet optio expedita minus. Vel ullam dolore voluptate excepturi iure.</p>
                <div className={"card-btn"}><IoEye/></div>
            </div>
        </div>
    </Fragment>
);
}

export default Card;