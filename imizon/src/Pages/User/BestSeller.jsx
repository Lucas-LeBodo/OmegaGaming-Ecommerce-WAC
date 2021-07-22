// Import Libs
import axios from 'axios';
import React, { Fragment, useEffect, useState }from 'react'
import { IoEye } from "react-icons/io5";
import {Link} from 'react-router-dom';

//import style 
import "../../Styles/ListingProduct.scss"

// Import Images
import image from '../../Assets/pc1.jpg';

const BestSeller = () => {
    const [showArticles, setShowArticles] = useState('');

    useEffect(() => {
        function getMostPopular() {
            axios.get('https://localhost:8000/api/articles/popularity', {
            }).then((response) => {
                let articles = response.data["hydra:member"];
                let showArticles = [];
                articles.forEach(element => {
                    showArticles.push(
                        <div className={"card"} key={"div1"+ element.id}>
                            <div className={"card-header"} key={"div2"+ element.id}>
                                <img src={image} alt="rover" key={element.Image} />
                            </div>
                            <div className={"card-body"} key={"div3"+ element.id}>
                                <span className={"card-price"} key={"span "+ element.id}>999.99€</span>
                                <h4 key={"Title "+ element.Title}> {element.Title} </h4>
                                <p key={"p"+ element.Description}> {element.Description} </p>
                                <div className={"card-btn"} key={"div4"+ element.id}><Link to={'/product'} key={"Link"+ element.id}><IoEye/></Link></div>
                            </div>
                        </div>
                    )
                });
                setShowArticles(showArticles);
            }).catch((error) => {
                console.log(error);
            })
        }

        getMostPopular();
    })

    return (
        <Fragment>
            {showArticles}
        </Fragment>
    )
}

export default BestSeller