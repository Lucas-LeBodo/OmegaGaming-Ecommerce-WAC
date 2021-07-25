// Import Libs
import axios from 'axios';
import React, { Fragment, useEffect, useState }from 'react'
import {Container} from 'react-bootstrap';


// Import Components
import Card from '../../Components/ArticleCard';


//import style 
import "../../Styles/ListingProduct.scss"

const Home = () => {
    const [showArticles, setShowArticles] = useState('');

    useEffect(() => {
        function getMostPopular() {
            axios.get('http://localhost:8000/api/articles/popularity', {
                params: {exist: "oui"}
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

    // affichage des card sur une ligne

    return (
        <Fragment>
            <Container>
                {showArticles}
            </Container>
        </Fragment>
    )
}

export default Home