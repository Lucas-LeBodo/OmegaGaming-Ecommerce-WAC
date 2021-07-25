// Import Libs
import axios from 'axios';
import React, { Fragment, useEffect, useState }from 'react'

//import style 
import "../../Styles/ListingProduct.scss"

import Card from '../../Components/ArticleCard';

const BestSeller = () => {
    const [showArticles, setShowArticles] = useState('');

    useEffect(() => {
        function getMostPopular() {
            axios.get('http://localhost:8000/api/articles/popularity', {
            }).then((response) => {
                let articles = response.data["hydra:member"];
                let showArticles = [];
                articles.forEach(element => {
                    showArticles.push(
                        <Card key={element.id} 
                              id={element.id}
                              title={element.Title}
                              image={element.Image}
                              description={element.Description}
                              price={element.Price}
                        />
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