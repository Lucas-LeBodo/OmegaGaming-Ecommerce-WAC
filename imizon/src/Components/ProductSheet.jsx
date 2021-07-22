// librairie
import { useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import axios from 'axios';

//image slider 
import Image1 from '../Styles/assets/testpc.jpeg';
import Image2 from '../Styles/assets/testpc2.jpeg';
import ImageDesc from '../Styles/assets/descLong.jpeg'

// css
import '../Styles/ProductSheet.scss';

// Components
import CarouselProduct from './ProductSheet/CarouselProduct'
import InformationsProduct from './ProductSheet/InformationsProduct'
import DescriptionLongProduct from './ProductSheet/DescriptionLongProduct'
import ImgDescriptionLongProduct from './ProductSheet/ImageDescLong'


// il faudra encore faire la liaison avec les page d'ajout au panier / achat immediat 



export default function ProductSheet () {
    const [article, setArticle] = useState('')

    // ici il faudra changer {id} pour afficher un articles
    axios.get("https://localhost:8000/api/articles/{id}").then((response) => { setArticle(response.data)})

    if(article != ''){
        return (
            <Container fluid id="product_sheet">
                <Row className="style_card">
                    <CarouselProduct img1={Image1} img2={Image2}/>
                    <InformationsProduct 
                        title={article.Title} 
                        description={article.Description}
                        price={article.Price}
                        stock='12'/>
                </Row>

                <Row className="style_card">
                    <Col>
                        <Row> 
                            <Col id="title_product">
                                <div> - Descriptif - </div>
                                
                            </Col> 
                        </Row>
                        <Row>
                            <DescriptionLongProduct/>
                            <ImgDescriptionLongProduct
                                id="img"
                                img={ImageDesc}
                            />
                        </Row>
                    </Col>
                    
                </Row>
            </Container>
        )
    
    }
    return(
        <Container fluid id="product_sheet">
            <Row className="style_card">
                <CarouselProduct img1={Image1} img2={Image2}/>
                <InformationsProduct 
                    title="PC Gamer - MSI MAG Infinite 10SA-1208FR 
                            - Core i5-10400F - RAM 8Go - Stockage 1To HDD " 
                    description="Fourni sans carte graphique, ce PC 
                        Gamer Falcon équipé d’un processeur 
                        Intel Core i5 10600K vous permet de 
                        profiter dès maintenant de la puissance 
                        d’un PC de dernière génération tout en 
                        réutilisant votre carte graphique actuelle,
                            en attendant la fin de la pénurie."
                    price="1 000"
                    stock='12'/>
            </Row>

            <Row className="style_card">
                <Col>
                    <Row> 
                        <Col id="title_product">
                            <div className="margin"> - Descriptif - </div>
                            
                        </Col> 
                    </Row>
                    <Row>
                        <DescriptionLongProduct/>
                        <ImgDescriptionLongProduct
                            id="img"
                            img={ImageDesc}
                        />
                    </Row>
                </Col>
                
            </Row>
            
        </Container>
    )
}