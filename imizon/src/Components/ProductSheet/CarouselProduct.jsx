import {Col, Carousel} from "react-bootstrap";


 
export default function carousel (props) {
    return(
        <Col>
            <Carousel  pause='hover' fade controls={false}>
                <Carousel.Item className="carousel_item margin">
                    <img
                        className="d-block w-100"
                        src= {props.img1}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item className="carousel_item margin">
                    <img
                        className="d-block w-100"
                        src= {props.img2}
                        alt="second slide"
                    />
                </Carousel.Item>
            </Carousel> 
        </Col>
    )
}