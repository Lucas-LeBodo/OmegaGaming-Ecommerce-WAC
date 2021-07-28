// librairie
import { useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import axios from 'axios';

//image slider 

// css
import '../../Styles/ProductSheet.scss';

// Components
import CarouselProduct from '../../Components/ProductSheet/CarouselProduct'
import InformationsProduct from '../../Components/ProductSheet/InformationsProduct'
import DescriptionLongProduct from '../../Components/ProductSheet/DescriptionLongProduct'
import ImgDescriptionLongProduct from '../../Components/ProductSheet/ImageDescLong'


const ProductSheet = (props) => {
    const [article, setArticle] = useState('')

    useEffect(() => {
        function getInformations() {
            let id = props.match.params.id;
    
            axios.get("http://localhost:8000/api/articles/"+id,{
            }).then((response) => { 
                let information = response.data;
                setArticle(information)
            }).catch((error) => {
                console.log(error)
            })

            axios.get('http://localhost:8000/api/articles/view', {
                params: {id: id}
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        }

        getInformations();
    }, [])
    if(article !== ''){
        return (
            <Container fluid id="product_sheet">
                <Row className="style_card">
                    <CarouselProduct img1={article.Image} img2={article.Image}/>
                    <InformationsProduct 
                        title={article.Title} 
                        description={article.Description}
                        price={article.Price}
                        stock={article.Stock}/>
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
                                img={article.Image}
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
                <CarouselProduct />
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
                            
                        />
                    </Row>
                </Col>
                
            </Row>
            
        </Container>
    )
}

export default ProductSheet