import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';

import axios from 'axios';

const Basket = () => {
    const [listBasket, setListBasket] = useState('');

    useEffect(() => {
        let list_articles = '';
        let list_id = [];
        let list_basket = [];

        if(localStorage.jwt) {
                const base64Url = localStorage.jwt.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                let username = JSON.parse(window.atob(base64)).username;

            axios.get('https://localhost:8000/api/baskets/countArticles', {
                params: {email: username}
            }).then((response) => {
                list_articles = response.data["hydra:member"]
                list_articles.forEach(element => {
                    axios.get('https://localhost:8000/api/articles/'+element.idArticles, {
                    }).then((response) => {
                        //FAIRE AFFICHAGE DANS LE PUSH
                        list_basket.push(response.data)
                    }).catch((error) => {
                        console.log(error)
                    })
                });
                setListBasket(list_basket);
            }).catch((error) => {
                console.log(error);
            })

        } else {
            if(localStorage.shoppingUserNoLog) {
                list_id = localStorage.shoppingUserNoLog;
                list_id = list_id.split(" ");
                list_id.forEach(element => {
                    axios.get('https://localhost:8000/api/articles/'+element.idArticles, {
                    }).then((response) => {
                        //FAIRE AFFICHAGE DANS LE PUSH
                        list_basket.push(response.data)
                    }).catch((error) => {
                        console.log(error)
                    })
                });
            }
        }

    }, [])
    
    return (
        <Container>

        </Container>
    )
}

export default Basket