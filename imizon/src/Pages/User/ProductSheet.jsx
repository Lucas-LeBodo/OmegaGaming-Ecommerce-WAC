// librairie
import { useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import axios from 'axios';

import '../../Styles/ProductSheet.scss';

// Components
import CarouselProduct from '../../Components/ProductSheet/CarouselProduct'
import InformationsProduct from '../../Components/ProductSheet/InformationsProduct'
import DescriptionLongProduct from '../../Components/ProductSheet/DescriptionLongProduct'
import ImgDescriptionLongProduct from '../../Components/ProductSheet/ImageDescLong'


const ProductSheet = (props) => {
    const [article, setArticle] = useState('');
    const [sameArticles, setSameArticles] = useState('');

    useEffect(() => {
        function getInformations() {
            let id = props.match.params.id;
        
            axios.get("https://localhost:8000/api/articles/"+id,{
            }).then((response) => { 
                let information = response.data;
                getSameArticles(information)
                setArticle(information)
            }).catch((error) => {
            })

            axios.get('https://localhost:8000/api/articles/view', {
                params: {id: id}
            }).then((response) => {
            }).catch((error) => {
            })

        }
        const getSameArticles = (information) => {
            axios.get('https://localhost:8000/api/articles/recupChildRef/?sameArticles=' + information.Title , {
            }).then((response) => {
                let allSameArticles = response.data["hydra:member"];
                setSameArticles(allSameArticles)
            }).catch((error) => {
            })
        }

        getInformations();
    }, [props])

    if(article !== ""){
        return (
            <Container fluid id="product_sheet">
                <Row className="style_card">
                    <CarouselProduct img1={article.Image} img2={article.Image}/>
                    <InformationsProduct 
                        title={article.Title} 
                        description={article.Description}
                        price={article.Price}
                        stock={article.Stock}
                        otherArticle={sameArticles}
                        id={article.id}
                        weight={article.weight}
                        discount={article.discount}
                    />
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
    } else {
        return (
            <Container>
                <p></p>
            </Container>
        )
    }
}

export default ProductSheet