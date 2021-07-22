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
                        <div className={"card"}>
                            <div className={"card-header"}>
                                <img src={image} alt="rover" />
                            </div>
                            <div className={"card-body"}>
                                <span className={"card-price"}>999.99€</span>
                                <h4> {element.Title} </h4>
                                <p> {element.Description} </p>
                                <div className={"card-btn"} ><Link to={'/product'}><IoEye/></Link></div>
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