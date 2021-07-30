// import libs
import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import { FiSave, FiXCircle} from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';



const Basket = () => {
    const [listBasket, setListBasket] = useState([]);

    // Delete Article on basket

    const deleteArticles = () => {

        console.log("Damien est incroyable")
    }

    

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
                        
                        let { id, Title, Image, Price, Stock} = response.data;
                        let onStock = "";
                        if(Stock >= 1){
                            onStock = "Disponible"
                        } else {
                            onStock = "Indisponible"
                        }
                        list_basket.push(
                            <div className="article-card" key={id + "_article-card"}>
                            <div className="article-img" key={id + "_article-img"}>
                                <img src={Image} alt={'image_'+id} key={id + "_article-image"}></img>
                            </div>
                            <div className="article-card-content" key={id + "_article-card-content"}>
                                <div className="head-card" key={id + "_article-head-card"}>
                                    <div className="article-title" key={id + "_article-title"}>
                                        <h3 key={id + "_article-h3"}>{Title}</h3>
                                        <div className="article-stock" key={id + "_article-stock"}>
                                        Stock : {onStock}
                                    </div>
                                    </div>
                                    <div className="article-price" key={id + "_article-price"}>
                                        {Price} €
                                    </div> 
                                </div>
                                <div className={"article-card-footer"} key={id + "_article-card-footer"}>
                                    <button onClick={deleteArticles} id={"remove"} key={id + "_article-remove-btn"}><RiDeleteBin5Line /> Delete</button>
                                </div>
                            </div>
                        </div>
                        )

                        setListBasket(listBasket.concat(list_basket));
                    }).catch((error) => {
                        console.log(error)
                    })
                });
                
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
                        let { id, Title, Image, Price, Stock} = response.data;
                        let onStock = "";
                        if(Stock >= 1){
                            onStock = "Disponible"
                        } else {
                            onStock = "Indisponible"
                        }
                        list_basket.push(
                            <div className="article-card" key={id + "_article-card"}>
                            <div className="article-img" key={id + "_article-img"}>
                                <img src={Image} alt={'image_'+id} key={id + "_article-image"}></img>
                            </div>
                            <div className="article-card-content" key={id + "_article-card-content"}>
                                <div className="head-card" key={id + "_article-head-card"}>
                                    <div className="article-title" key={id + "_article-title"}>
                                        <h3 key={id + "_article-h3"}>{Title}</h3>
                                        <div className="article-stock" key={id + "_article-stock"}>
                                        Stock : {onStock}
                                    </div>
                                    </div>
                                    <div className="article-price" key={id + "_article-price"}>
                                        {Price} €
                                    </div> 
                                </div>
                                <div className={"article-card-footer"} key={id + "_article-card-footer"}>
                                    <button onClick={deleteArticles} id={"remove"} key={id + "_article-remove-btn"}><RiDeleteBin5Line /> Delete</button>
                                </div>
                            </div>
                        </div>
                        )

                        setListBasket(listBasket.concat(list_basket));
                    }).catch((error) => {
                        console.log(error)
                    })
                });
            }
        }
    }, [])


    return (
        <Fragment>
            <div className="container">
                <div className="head-list">
                    <h3>Produit</h3>
                    <h3>Prix</h3>
                </div>
                <div className="container_card">
                    {listBasket}
                </div>
            </div>            
        </Fragment>
    )
}

export default Basket