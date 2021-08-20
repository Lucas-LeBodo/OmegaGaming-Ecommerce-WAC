// import libs
import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Form } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';

//import functions
import FormOrder from '../../Components/shippyPro/FormOrder';
import SendOrder from '../../Components/shippyPro/SendOrder'

const Basket = () => {
    const [listBasketShow, setListBasketShow] = useState([]);    
    const [showPrice, setShowPrice] = useState(0);
    const [contentModal, setContentModal] = useState('')
    const [allArticles, setAllArticles] = useState('');
    const [basketNotCo, setBasketNotCo] = useState('')
    // pour les frais de port
    const [country, setCountry] = useState('')
    const [adress, setAdress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [cardData, setCardData] = useState('')
    const [rates, setRates] = useState('')
    const history = useHistory();
    let showPriceDiv = '';

    useEffect(() => {
        let list_id = [];
        let list_articles = '';
    
        const getInformation = () =>{
            if(localStorage.jwt) {
                const base64Url = localStorage.jwt.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                let username = JSON.parse(window.atob(base64)).username;
                axios.get('http://localhost:8000/api/me', {
                params: {username: username}
                }).then((response) => {
                    let weightTotal = 0.01;
                    if(list_articles.length > 1){
                        list_articles.forEach((article) => {
                            weightTotal = article.weight + weightTotal;
                        })
                    }
                    getRates(response.data, weightTotal)
                })
            }else{
                let weightTotal = 0.01;
                let infos = {
                    adress: "Rue d'Avron 116",
                    postalCode: "75020",
                    email: "johndoe@gmail.com",
                    lastName: "John",
                    firstName: "Doe",
                    country: "FR"
                }
                axios.get('http://localhost:8000/api/baskets/listBasket', {
                    params: {tabList:list_id},
                }).then((response) => {
                    let list_articles = response.data["hydra:member"];
                    setBasketNotCo(list_articles)
                    list_articles.forEach((element) => {
                        weightTotal = element.weight + weightTotal
                    })
                    getRates(infos, weightTotal,list_articles)
                })
                
            }
        }
        const getRates = (info, W, listArt) => {
         
            let data = JSON.stringify({
                "to_address": {
                    "name": info.firstName,
                    "company": "ShippyPro",
                    "street1": info.adress,
                    "street2": "",
                    "city": "Paris",
                    "state": "Département de Paris",
                    "zip": info.postalCode,
                    "country": "FR", // changer l'entree dans le form mettre initial (ex: Fr)
                    "phone": "5551231234",
                    "email": info.email
                },
                "from_address": {
                    "name": "Damien Legrand",
                    "company": "Aucune",
                    "street1": "Rue d'Avron 116",
                    "street2": "",
                    "city": "Paris",
                    "state": "Département de Paris",
                    "zip": "75020",
                    "country": "FR",
                    "phone": "+33 623525172",
                    "email": "damienlg06@hotmail.com"
                },
                "parcels": [
                    {
                        "length": 5,
                        "width": 5,
                        "height": 5,
                        "weight": W
                    }
                ],
                "Insurance": 0,
                "InsuranceCurrency": "EUR",
                "CashOnDelivery": 0,
                "CashOnDeliveryCurrency": "EUR",
                "ContentDescription": "Shoes",
                "TotalValue": "50.25 EUR",
                "ShippingService": "Standard"
            })
            
            if(list_articles != "" || listArt != ""){
                axios.get('http://localhost:8000/api/shippy/getRates?params=' + data,{  
                }).then((response) => {
                    setRates(response.data.Rates['hydra:member'][0])
                }).catch((error) => {
                    
                })
            }
        }


        if(localStorage.jwt) {
            const base64Url = localStorage.jwt.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            let username = JSON.parse(window.atob(base64)).username;
            
            axios.get('http://localhost:8000/api/baskets/countArticles', {
                params: {email: username}
            }).then((response) => {
                list_articles = response.data["hydra:member"]
                requestConnected(list_articles)
                getInformation(list_articles)
            }).catch((error) => {
                console.log(error);
            })
    
        } else {
            if(localStorage.shoppingUserNoLog) {
                list_id = localStorage.shoppingUserNoLog;
                list_id = list_id.split(" ");
                requestNotConnected(list_id)
                getInformation(list_id)
            }
        }
    }, [])

    const deleteArticles = (id, connected) => {
        if(connected === "connected") {
            let check = window.confirm("Are you sure ?");
            if(check === true) {
                axios.delete('http://localhost:8000/api/baskets/'+id, {
                }).then((response) => {
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
                let indexSplice = list_id.findIndex(element => element === id)
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
        axios.get('http://localhost:8000/api/baskets/listBasket', {
            params: {tabList:tabList},
        }).then((response) => {
            if(response.data !== null) {
                let listBasketShow = response.data["hydra:member"];
                let i = 0;
                setAllArticles(listBasketShow)
                listBasketShow.forEach(element => {
                    let onStock = "";
                    let { id, Title, Image, Price, Stock, discount} = element;
                    let discountPrice = '';
                    let newPrice = '';
    
                    if(Stock >= 1){
                        onStock = "Disponible"
                    } else {
                        onStock = "Indisponible"
                    }
                    let idBasket = list_articles[i].id
                    
                    
                    if(discount !== null && discount !== 0) {
                        let pricePromo = '';
                        newPrice = Price * discount / 100
                        discountPrice = (
                            <div className="article-price" key={id + "_article-price"}>
                                Promotion : {Price - newPrice} €
                            </div> 
                        )
                        pricePromo = Price - newPrice
                        price = price + pricePromo
                    } else {
                        discountPrice = (
                            <div className="article-price" key={id + "_article-price"}>
                                {Price} €
                            </div> 
                        )
                        price = price + element.Price
                    }
                    
                    
                    showBasket.push(
                        <div className="article-card" key={id + "_article-card"}>
                        <div className="article-img" key={id + "_article-img"}>
                            <img src={Image} alt={'image_'+id} key={id + "_article-image"}></img>
                        </div>
                        <div className="article-card-content" key={id + "_article-card-content"}>
                            <div className="head-card" key={id + "_article-head-card"}>
                                <div className="article-title" key={id + "_article-title"}>
                                    <Link to={"/product/"+id}><h3 key={id + "_article-h3"}>{Title}</h3></Link>
                                    <div className="article-stock" key={id + "_article-stock"}>
                                    Stock : {onStock}
                                </div>
                                </div>
                                {discountPrice}
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
            }
            
        }).catch((error) => {
            console.log(error)
        })
    }


    const requestNotConnected = (listBasketShow) => {
        let showBasket = [];
        let price = 0;
        
        axios.get('http://localhost:8000/api/baskets/listBasket', {
            params: {tabList:listBasketShow},
        }).then((response) => {
            let listBasketShow = response.data["hydra:member"];
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


 
    /**
     *  fonction de submit de command
     * 
     * @param {*} e
     */

    const submit = (e, co) => {
        e.preventDefault()
        let totalPriceBasket = showPrice;
        let weight = 0.01 ;
        let idUser = e.target[7].value
        let data;
        let confirmOrderSend;
        if(co == 'co'){
            if(allArticles.length == 1){
                weight = allArticles[0].weight;
            }else{
                allArticles.forEach(element => {
                    weight = element.weight + weight
                })
            }
            data = FormOrder(weight, co, e, totalPriceBasket)
            if(data != ""){
                SendOrder(data, idUser, totalPriceBasket, allArticles)
            }
        }
        else{
            let co = 'not';
            if(basketNotCo.length == 1){
                weight = basketNotCo[0].weight;
            }
            else{
                basketNotCo.forEach(element => {
                    weight = element.weight + weight
                })
            }
            data = FormOrder(weight, co, e, totalPriceBasket)
            
            if(data != ""){
                SendOrder(data, idUser, totalPriceBasket, basketNotCo)
            }
            
        }
    }

    function handleShow() {
        let content = '';
        if(localStorage.jwt) {
            const base64Url = localStorage.jwt.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            let username = JSON.parse(window.atob(base64)).username;
            axios.get('http://localhost:8000/api/me', {
            params: {username: username}
        }).then((response) => {
            setCountry(response.data.country)
            setAdress(response.data.adress)
            setPostalCode(response.data.postalCode)
            setCardData(response.data.cardData)
            let co = "co"
            content = (
                <Form onSubmit={(event) => {submit(event, co)}}>
                    <Form.Group className="mb-3">
                        <Form.Label>Pays</Form.Label>
                        <Form.Control type="text" defaultValue={response.data.country} onChange={(event) => { setCountry(event.target.value) }} placeholder="Enter Country" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control type="text" defaultValue={response.data.adress} onChange={(event) => { setAdress(event.target.value) }} placeholder="Enter Adress" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Code Postal</Form.Label>
                        <Form.Control type="text" defaultValue={response.data.postalCode} onChange={(event) => { setPostalCode(event.target.value) }} placeholder="Enter Postal Code" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Paiement</Form.Label>
                        <Form.Control type="text" defaultValue={response.data.cardData} onChange={(event) => { setCardData(event.target.value) }} placeholder="Enter your card !" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="hidden" defaultValue={response.data.firstName}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="hidden" defaultValue={response.data.lastName}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="hidden" defaultValue={response.data.email}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="hidden" defaultValue={response.data.id}/>
                    </Form.Group>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">Save changes</button>
                </Form>
            )
            setContentModal(content)
        }).catch((error) => {
            console.log(error);
        })
        } else {
            let check = window.confirm("Avez-vous un compte ? Si vous voulez vous connecter !")
            if(check === true) {
                history.push("/login")
            } else {
                let notCo = "notCo"
                content = (
                    <Form onSubmit={(event) => {submit(event, notCo)}}>
                        <Form.Group className="mb-3">
                            <Form.Label>Pays</Form.Label>
                            <Form.Control type="text" onChange={(event) => { setCountry(event.target.value) }} placeholder="Enter Country" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control type="text" onChange={(event) => { setAdress(event.target.value) }} placeholder="Enter Adress" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Code Postal</Form.Label>
                            <Form.Control type="text" onChange={(event) => { setPostalCode(event.target.value) }} placeholder="Enter Postal Code" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Paiement</Form.Label>
                            <Form.Control type="text" onChange={(event) => { setCardData(event.target.value) }} placeholder="Enter your card !" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="hidden" defaultValue='john'/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="hidden" defaultValue='doe'/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="hidden" defaultValue='toto@'/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="hidden" defaultValue='0'/>
                        </Form.Group>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">Save changes</button>
                    </Form>
                )
                setContentModal(content)
            }
        }
      }

      if(listBasketShow.length > 0) {
          showPriceDiv = (
            <div>
                <p>{showPrice + "€"}</p>
                <p>{"Frais de port : " + rates.rate + "€"}</p>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleShow}>
                    Payer
                </button>
            </div>
          )
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
                {showPriceDiv}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-body">
                                {contentModal}
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </Fragment>
    )
}

export default Basket