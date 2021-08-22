// import libs
import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Form } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';

import GetTokenInformation from '../../Components/tools/GetTokenInformation';

const Basket = () => {
    const [listBasketShow, setListBasketShow] = useState([]);    
    const [showPrice, setShowPrice] = useState(0);
    const [contentModal, setContentModal] = useState('');
    const [allArticles, setAllArticles] = useState('');

    //Data user Log !
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [basketNotCo, setBasketNotCo] = useState('')
    
    // pour les frais de port
    const [adressData, setAdressData] = useState('');
    const [country, setCountry] = useState('');
    const [adress, setAdress] = useState('');
    const [zip, setZip] = useState('');
    const [town, setTown] = useState('');
    const [rates, setRates] = useState('');
    const history = useHistory();
    let showPriceDiv = '';

    useEffect(() => {
        let list_id = [];
        let list_articles = '';
        let i = 0;
        let input = '';
    
        if(localStorage.jwt) {
            let username = GetTokenInformation(false)

            axios.get('https://localhost:8000/api/adresses?page=1&id_user='+id, {
            }).then((response) => {
                if(response.data["hydra:member"].length > 0) {
                    let showAdress = [];
                    let data = response.data["hydra:member"];
                    setCountry(data[0].country)
                    setTown(data[0].town)
                    setAdress(data[0].adress)
                    setZip(data[0].zip)

                    data.forEach(element => {
                        if(i === 0) {
                            input = (<input className={'adress-element-radio'} name={"adress"} key={"input" + element.id} type="radio" value={i}  onChange={(event) => changeAdress(data, event)} defaultChecked />)
                        } else {
                            input = (<input className={'adress-element-radio'} name={"adress"} key={"input" + element.id} type="radio" value={i}  onChange={(event) => changeAdress(data, event)}/>)
                        }
                        showAdress.push(
                            <div className={'adress-table-body'} key={"divbody" + element.id}>
                                <div className={'adress-table-element'} key={"divelement" + element.id}>
                                    {input}
                                    <div className={'adress-element'} key={"Adress" + element.id}>{element.adress} </div>
                                    <div className={'adress-element'} key={"Town" + element.id}>{element.town} </div>
                                    <div className={'adress-element'} key={"Zip" + element.id}>{element.zip} </div>  
                                    <div className={'adress-element'} key={"Country" + element.id}>{element.country} </div> 
                                </div>
                            </div>
                        )
                        i++;
                    });
                    setAdressData(showAdress);
                }
            }).catch((error) => {
                console.log(error)
            })
            
            axios.get('https://localhost:8000/api/baskets/countArticles', {
                params: {email: username}
            }).then((response) => {
                list_articles = response.data["hydra:member"]
                requestConnected(list_articles)
                getInformation(list_articles, username)
            }).catch((error) => {
                console.log(error);
            })
        } else {
            if(localStorage.shoppingUserNoLog) {
                list_id = localStorage.shoppingUserNoLog;
                list_id = list_id.split(" ");
                requestNotConnected(list_id)
                getInformation(list_id, "John")
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const getInformation = (list_articles, username) =>{
        let weightTotal = 0;
        if(localStorage.jwt) {
            axios.get('https://localhost:8000/api/me', {
                params: {username: username}
            }).then((response) => {
                setId(response.data.id)
                setEmail(response.data.email)
                setLastName(response.data.lastName)
                setFirstName(response.data.firstName)

                if(list_articles.length > 0){
                    list_articles.forEach((article) => {
                        weightTotal = article.weight + weightTotal;
                    })
                }
                getRates(weightTotal, list_articles)
            })
        }else{
            axios.get('https://localhost:8000/api/baskets/listBasket', {
                params: {tabList:list_articles},
            }).then((response) => {
                list_articles = response.data["hydra:member"];
                setBasketNotCo(list_articles)
                list_articles.forEach((element) => {
                    weightTotal = element.weight + weightTotal
                })
                getRates(weightTotal, list_articles)
            })
            
        }
    }

    const getRates = (W, listArt) => {
        let data = JSON.stringify({
            "to_address": {
                "name": "John Doe",
                "company": "ShippyPro",
                "street1": "Rue d'Avron 116",
                "street2": "",
                "city": "Paris",
                "state": "Département de Paris",
                "zip": "75020",
                "country": "FR",
                "phone": "5551231234",
                "email": "cool@cool.fr"
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
        
        if(listArt !== ""){
            axios.get('https://localhost:8000/api/shippy/getRates?params=' + data,{  
            }).then((response) => {
                setRates(response.data.Rates['hydra:member'][0])
            }).catch((error) => {
            })
        }
    }

    const changeAdress = (data, event) => {
        let i = event.target.value

        setCountry(data[i].country)
        setTown(data[i].town)
        setAdress(data[i].adress)
        setZip(data[i].zip)
    }

    const deleteArticles = (id, connected) => {
        if(connected === "connected") {
            let check = window.confirm("Are you sure ?");
            if(check === true) {
                axios.delete('https://localhost:8000/api/baskets/'+id, {
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
        axios.get('https://localhost:8000/api/baskets/listBasket', {
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
        
        axios.get('https://localhost:8000/api/baskets/listBasket', {
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

    const checkbox = () => {
        let check  = document.getElementById('form_check').checked;
        let radio = document.getElementsByClassName("adress-element-radio");

        if(check === true) {
            document.getElementById("form_country").disabled = false
            document.getElementById("form_adress").disabled = false
            document.getElementById("form_zip").disabled = false
            document.getElementById("form_town").disabled = false

            for(let j = 0; j < radio.length; j++) {
                if(radio[j].checked === true) {
                    radio[j].checked = false
                }
                radio[j].disabled = true
            }
        } else {
            document.getElementById("form_country").disabled = true
            document.getElementById("form_adress").disabled = true
            document.getElementById("form_zip").disabled = true
            document.getElementById("form_town").disabled = true

            for(let j = 0; j < radio.length; j++) {
                radio[j].disabled = false
            }
        }
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
        let sendData;
        
        if(co === 'co'){
            if(allArticles.length === 1){
                weight = allArticles[0].weight;
            }else{
                allArticles.forEach(element => {
                    weight = element.weight + weight
                })
            }
            
            sendData = {weight, co, totalPriceBasket,
                email, lastName, firstName,
                adress, town, zip, country, id, allArticles
            }
            history.push("/basket/payment", {sendData})
        }
        else{
            let id = 0;
            let co = 'not';
            if(basketNotCo.length === 1){
                weight = basketNotCo[0].weight;
            }
            else{
                basketNotCo.forEach(element => {
                    weight = element.weight + weight
                })
            }

            sendData = {weight, co, totalPriceBasket, id, basketNotCo,
                        country: e.target[0].value,
                        adress: e.target[1].value,
                        town: e.target[2].value,
                        zip: e.target[3].value
                       }
            history.push("/basket/payment", {sendData})
        }
    }

    function handleShow() {
        let content = '';
        if(localStorage.jwt) {
            let co = "co"
            content = (
                <div>
                    <div className="adress-grid">
                        <div className={'adress-table'}>
                            <div className={'adress-table-head'}>
                                <div className={'adress-table'}>Adresse</div>
                                <div className={'adress-table'}>Town</div>
                                <div className={'adress-table'}>ZIP Code</div>
                                <div className={'adress-table'}>Country</div>
                            </div>
                            <form>
                                {adressData}  
                            </form>
                        </div>
                    </div>
                    <Form onSubmit={(event) => {submit(event, co)}}>
                        <input type="checkbox" onChange={() => checkbox()} id={"form_check"}/>
                        <label>Put an Other Adress</label>
                        <Form.Group className="mb-3">
                            <Form.Label>Pays</Form.Label>
                            <Form.Control type="text" id={"form_country"} onChange={(event) => { setCountry(event.target.value) }} placeholder="Enter Country" disabled/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control type="text" id={"form_adress"} onChange={(event) => { setAdress(event.target.value) }} placeholder="Enter Adress" disabled/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Town</Form.Label>
                            <Form.Control type="text" id={"form_town"} onChange={(event) => { setTown(event.target.value) }} placeholder="Enter Town" disabled/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control type="text" id={"form_zip"} onChange={(event) => { setZip(event.target.value) }} placeholder="Enter Postal Code" disabled/>
                        </Form.Group>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Go to Payment</button>
                    </Form>
                </div>
            )
            setContentModal(content)
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
                            <Form.Control type="text" placeholder="Enter Country" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control type="text" placeholder="Enter Adress" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Town</Form.Label>
                            <Form.Control type="text" placeholder="Enter Town" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Code Postal</Form.Label>
                            <Form.Control type="text" placeholder="Enter Zip" />
                        </Form.Group>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
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