// import libs
import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import { RiDeleteBin5Line } from 'react-icons/ri';
import {Modal} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';



const Basket = () => {
    const [listBasketShow, setListBasketShow] = useState([]);    
    const [listBasketOrder, setListBasketOrder] = useState([]);    
    const [showPrice, setShowPrice] = useState(0);
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [contentModal, setContentModal] = useState('')
    const value = "true"
    const history = useHistory();

    useEffect(() => {
        let list_id = [];
        let list_articles = '';
        
        if(localStorage.jwt) {
            const base64Url = localStorage.jwt.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            let username = JSON.parse(window.atob(base64)).username;
            
            axios.get('https://localhost:8000/api/baskets/countArticles', {
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
                axios.delete('https://localhost:8000/api/baskets/'+id, {
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
        let price = 0;
        let tabList = [];
        let showBasket = [];
        list_articles.forEach(element => {
            tabList.push(element.idArticles)
        });

        axios.get('https://localhost:8000/api/baskets/listBasket', {
            params: {tabList:tabList},
        }).then((response) => {
            let listBasketShow = response.data["hydra:member"];
            setListBasketOrder(listBasketShow);
            let i = 0;
            
            listBasketShow.forEach(element => {
                let onStock = "";
                let { id, Title, Image, Price, Stock} = element;
                if(Stock >= 1){
                    onStock = "Disponible"
                } else {
                    onStock = "Indisponible"
                }
                let idBasket = list_articles[i].id
                price = price + element.Price
                
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
            setShowPrice(price)
            setListBasketShow(showBasket);
            
        }).catch((error) => {
            console.log(error)
        })
    }

    const requestNotConnected = (listBasketShow) => {
        let showBasket = [];
        let price = 0;

        axios.get('https://localhost:8000/api/baskets/listBasket', {
            params: {tabList:listBasketShow},
        }).then((response) => {
            let listBasketShow = response.data["hydra:member"];
            setListBasketOrder(listBasketShow);
            
            listBasketShow.forEach(element => {
                let onStock = "";
                let { id, Title, Image, Price, Stock} = element;
                if(Stock >= 1){
                    onStock = "Disponible"
                } else {
                    onStock = "Indisponible"
                }
                price = price + element.Price;

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
            setListBasketShow(showBasket);
            setShowPrice(price)
            
        }).catch((error) => {
            console.log(error)
        })
    }

    const order = () => {
        
    }

    function handleShow(breakpoint) {
        let content = '';
        if(localStorage.jwt) {
            const base64Url = localStorage.jwt.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            let username = JSON.parse(window.atob(base64)).username;
            axios.get('https://localhost:8000/api/me', {
            params: {username: username}
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error);
        })
            setFullscreen(breakpoint);
            setShow(true);
            axios.get("")
        } else {
            let check = window.confirm("Avez-vous un compte ? Si vous voulez vous connecter !")
            if(check === true) {
                history.push("/login")
            } else {
                setFullscreen(breakpoint);
                setShow(true);

            }
        }
      }


    return (
        <Fragment>
            <div className="container">
                <div className="head-list">
                    <h3>Produit</h3>
                    <h3>Prix</h3>
                </div>
                <div className="container_card">
                    {listBasketShow}
                </div>
                <div>
                    <p>{showPrice + "€"}</p>
                    <button onClick={() => handleShow(value)}>Paiement</button>
                </div>
                <Modal style={{width:"auto"}} show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {contentModal}
                    </Modal.Body>
                </Modal>
            </div>            
        </Fragment>
    )
}

export default Basket