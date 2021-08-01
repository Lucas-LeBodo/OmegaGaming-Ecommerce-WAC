// import libs
import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import { RiDeleteBin5Line } from 'react-icons/ri';


const Basket = () => {
    const [listBasket, setListBasket] = useState([]);    

    useEffect(() => {
        let list_id = [];
        let list_articles = '';
        
        if(localStorage.jwt) {
            const base64Url = localStorage.jwt.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            let username = JSON.parse(window.atob(base64)).username;
            
            axios.get('http://localhost:8000/api/baskets/countArticles', {
                params: {email: username}
            }).then((response) => {
                list_articles = response.data["hydra:member"]
                requestConnected(list_articles)
            }).catch((error) => {
                console.log(error);
            })

        } else {
            if(localStorage.shoppingUserNoLog) {
                list_id = localStorage.shoppingUserNoLog;
                list_id = list_id.split(" ");
                requestNotConnected(list_id)
            }
        }
    }, [])

    const deleteArticles = (id, connected) => {
        if(connected === "connected") {
            let check = window.confirm("Are you sure ?");
            if(check === true) {
                axios.delete('http://localhost:8000/api/baskets/'+id, {
                }).then((response) => {
                    console.log(response)
                    window.location.reload();
                }).catch((error) => {
                    console.log(error)
                })
            }
        } else {
            let check = window.confirm("Are you sure ?");
            if(check === true) {
                let list_id = localStorage.shoppingUserNoLog;
                list_id = list_id.split(" ");
                let indexSplice = list_id.findIndex(element => element == id)
                list_id.splice(indexSplice, 1)

                localStorage.removeItem("shoppingUserNoLog")
                if(list_id.length === 1){
                    localStorage.setItem("shoppingUserNoLog", list_id[0])
                } else if (list_id.length > 1) {
                    let string = '';
                    for(let i = 0; i < list_id.length; i++) {
                        if(i === 0) {
                            string = list_id[i]
                        } else {
                            string = string + " " + list_id[i]
                        }
                    }
                    localStorage.setItem("shoppingUserNoLog", string)
                }
                window.location.reload()
            }
        }
    }

    const requestConnected = (list_articles) => {
        let tabList = [];
        let showBasket = [];
        list_articles.forEach(element => {
            tabList.push(element.idArticles)
        });

        axios.get('http://localhost:8000/api/baskets/listBasket', {
            params: {tabList:tabList},
        }).then((response) => {
            let listBasket = response.data["hydra:member"];
            let i = 0;
            
            listBasket.forEach(element => {
                let onStock = "";
                let { id, Title, Image, Price, Stock} = element;
                if(Stock >= 1){
                    onStock = "Disponible"
                } else {
                    onStock = "Indisponible"
                }
                let idBasket = list_articles[i].id
                
                showBasket.push(
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
                            <button onClick={() => deleteArticles(idBasket, "connected")} id={"remove"} key={id + "_article-remove-btn"}><RiDeleteBin5Line /> Delete</button>
                        </div>
                    </div>
                </div>
                )
                i = i + 1;
            });
            setListBasket(showBasket);
            
        }).catch((error) => {
            console.log(error)
        })
    }

    const requestNotConnected = (listBasket) => {
        let showBasket = [];

        axios.get('http://localhost:8000/api/baskets/listBasket', {
            params: {tabList:listBasket},
        }).then((response) => {
            let listBasket = response.data["hydra:member"];
            
            listBasket.forEach(element => {
                let onStock = "";
                let { id, Title, Image, Price, Stock} = element;
                if(Stock >= 1){
                    onStock = "Disponible"
                } else {
                    onStock = "Indisponible"
                }

                showBasket.push(
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
                            <button onClick={() => deleteArticles(id, "nope")} id={"remove"} key={id + "_article-remove-btn"}><RiDeleteBin5Line /> Delete</button>
                        </div>
                    </div>
                </div>
                )
            });
            setListBasket(showBasket);
            
        }).catch((error) => {
            console.log(error)
        })
    }


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