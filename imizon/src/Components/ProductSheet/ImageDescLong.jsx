import { Container, Row, Col } from "react-bootstrap";

export default function imgDescriptionLong (props){
    return(
        <Col id="image_product">
            <div> 
                <img 
                    src={props.img}
                    alt="image product"
                />
            </div> 
        </Col>
    )
}