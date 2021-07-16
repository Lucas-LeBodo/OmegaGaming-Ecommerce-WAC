import { Container, Row, Col, Carousel } from "react-bootstrap";
import { BiEuro } from 'react-icons/bi';

import '../Styles/ProductSheet.scss';
import Image1 from '../Styles/assets/testpc.jpeg';
import Image2 from '../Styles/assets/testpc2.jpeg';
export default function FormSignUp () {
    return(
        <Container fluid id="product_sheet">
            <Row className="style_card">
                <Col>
                    <div>premiere col</div>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src= {Image1}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src= {Image2}
                                alt="second slide"
                            />
                        </Carousel.Item>
                    </Carousel> 
                </Col>

                <Col>
                    <Row> 
                        <div> 
                            <h5>PC Gamer - MSI MAG Infinite 10SA-1208FR 
                                - Core i5-10400F - RAM 8Go - Stockage 1To HDD 
                            </h5>
                        </div> 
                    </Row>
                    <Row> 
                        <div> 
                            <p>
                                Fourni sans carte graphique, ce PC Gamer Falcon équipé d’un processeur Intel Core i5 10600K vous permet de profiter dès maintenant de la puissance d’un PC de dernière génération tout en réutilisant votre carte graphique actuelle, en attendant la fin de la pénurie.
                            </p> 
                        </div> 
                    </Row>
                    <Row> 
                        <div> 
                            <p>1000 <BiEuro /></p>
                        </div> 
                    </Row>
                    <Row> 
                        <div> 
                            En Stock / Nb en Stock 
                        </div> 
                    </Row>
                    <Row> 
                        <div> 
                            btn Ajout panier 
                        </div> 
                    </Row>
                </Col>

            </Row>

            <Row className="style_card">
                <Col>
                    <Row> 
                        <Col id="title_product">
                            <div> Title </div>
                        </Col> 
                    </Row>
                    <Row>
                        <Col id="description_product">
                            <Row> <div> Description longue  </div> </Row>
                        </Col>
                        <Col id="image_product">
                            <Row> <div> Image </div> </Row>
                        </Col>
    
                    </Row>
                </Col>
                
            </Row>
            
        </Container>
    )
}