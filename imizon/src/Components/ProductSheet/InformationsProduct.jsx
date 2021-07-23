import { Row, Col, Button } from "react-bootstrap";

//import icon euro
import { BiEuro } from 'react-icons/bi';
import { MdAddShoppingCart } from 'react-icons/md';
import { FcOk } from 'react-icons/fc';

export default function informationProduct(props){
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
                <div id="price" className="margin"> 
                    <p> {props.price}<BiEuro /></p>
                    <p id="eco_parti">dont éco-participation 1€44</p>
                </div> 
            </Row>
            <Row> 
                <Col>
                    <div id="buy" className="margin" > 
                        <Button id="btn_panier"> <MdAddShoppingCart/> Ajouter au panier </Button>
                    </div> 
                </Col>
                <Col>
                    <div id="buy" className="margin"> 
                        <Button id="btn_panier"> <MdAddShoppingCart/> Acheter maintenant </Button>
                    </div> 
                </Col>
            </Row>
            <Row>
                <div id="stock" className="margin">
                    <p> {props.stock} En stock <FcOk/> </p>
                </div>
            </Row>
        </Col>
    )
}