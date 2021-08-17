// Import Libs 
import React, { useState, useEffect } from "react";
import axios from 'axios';

// Import Components
import Card from './ArticleCard';

const CardSearch = (props) => {
    const [article, setArticle] = useState('')

   useEffect(() => {
        axios.get('https://localhost:8000'+ props.value, {
        }).then((response) => {
            setArticle(response.data);
        }).catch((error) => {
            console.log(error);
        })
   }, [props])

    return(
        <Card 
            key={article.id} 
            id={article.id}
            title={article.Title}
            image={article.Image}
            description={article.Description}
            price={article.Price}
            discount={article.discount}
        />
    )
}

export default CardSearch;