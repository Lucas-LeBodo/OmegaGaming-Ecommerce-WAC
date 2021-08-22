import { Row, Col, Button } from "react-bootstrap";

//import icon euro
import { BiEuro } from 'react-icons/bi';
import { MdAddShoppingCart } from 'react-icons/md';
import { FcOk, FcHighPriority } from 'react-icons/fc';
import axios from "axios";

export default function informationProduct(props){
    
    let sameArticle = props.otherArticle;
    let result;
    if(sameArticle)
    {
        result = sameArticle.map((child) => {
            return(
                <a key={Math.random().toString(36).substring(7)} href={child.id} >{child.Title} : {child.featureDiff} : {child.Price} <BiEuro /></a>
            )
            
        })
    }

    let username = '';
    let token = localStorage.jwt;

    if(token){
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        username = JSON.parse(window.atob(base64)).username;
    }
    
    const addToBasket = () => {
        if(token){
            let id_user = "";

            axios.get('https://localhost:8000/api/me', {
                params: {username: username}
            }).then((response) => {
                id_user = response.data.id
                addToBasketBDD(id_user);
            }).catch((error) => {
            })
        } else {
            if(localStorage.shoppingUserNoLog) {
                let list_id = localStorage.shoppingUserNoLog;
                list_id = list_id + " " + props.id
                localStorage.setItem("shoppingUserNoLog", list_id)
            } else {
                localStorage.setItem("shoppingUserNoLog", props.id)
            }
        }
    }

    function addToBasketBDD(id_user) {
        let id_art = props.id;
        axios.post('https://localhost:8000/api/baskets', {
                price: parseInt(props.price),
                idUser: parseInt(id_user),
                idArticles: parseInt(id_art),
                weight : parseInt(props.weight)
            }).then((response) => {
                window.location.reload()
            }).catch((error) => {
            })
    }

    //DISCOUNT
    let discountPrice = '';
    let newPrice = '';

    if(props.discount !== null && props.discount !== 0) {
        newPrice = props.price * props.discount / 100
        discountPrice = (
            <div id="price" className="margin"> 
                <div className="d-flex">
                    <p> <del>{props.price}<BiEuro /></del></p>
                    <p className="badge bg-danger">Promotion : {props.discount + "% !!!"}</p>
                </div>
                    <p>{props.price - newPrice}</p>
                    <p id="eco_parti">dont éco-participation 1€44</p>
                </div> 
        )
    } else {
        discountPrice = (
            <div id="price" className="margin"> 
                    <p> {props.price}<BiEuro /></p>
                    <p id="eco_parti">dont éco-participation 1€44</p>
                </div> 
        )
    }

    let stock = ""
    if(props.stock > 0) {
        stock = (
            <div>
                <Row> 
                    <Col>
                        <div id="buy" className="margin" > 
                            <Button id="btn_panier" onClick={addToBasket}> <MdAddShoppingCart/> Ajouter au panier </Button>
                        </div> 
                    </Col>
                </Row>
                <Row>
                    <div id="stock" className="margin">
                        <p> {props.stock} En stock <FcOk/> </p>
                    </div>
                </Row>
            </div>
        )
    } else {
        stock = (
            <div>
                <Row> 
                    <Col>
                        <div id="buy" className="margin" > 
                            <Button id="btn_panier" onClick={addToBasket} disabled> <MdAddShoppingCart/> Ajouter au panier </Button>
                        </div> 
                    </Col>
                </Row>
                <Row>
                    <div id="stock" className="margin">
                        <p> {props.stock} Indisponible <FcHighPriority/> </p>
                    </div>
                </Row>
            </div>
        )
    }

    return(
        <Col>
            <Row> 
                <div className="margin"> 
                    <h5>{props.title}</h5>
                    <div id="hr"></div>
                </div> 
            </Row>
            <Row> 
                <div id="description" className="margin"> 
                    <p>{props.description}</p> 
                </div> 
            </Row>
            <Row> 
                {discountPrice}
            </Row>
                {stock}
            <Row>
                <div id="otherArticles" className="margin">
                    <p> {result} </p>
                </div>
            </Row>
        </Col>
    )
}