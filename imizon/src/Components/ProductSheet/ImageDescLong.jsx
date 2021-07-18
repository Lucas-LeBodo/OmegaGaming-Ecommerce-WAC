import { Container, Row, Col } from "react-bootstrap";

export default function imgDescriptionLong (props){
    return(
        <Col id="image_product">
            <div className="margin"> 
                <img 
                    src={props.img}
                    alt="image product"
                />
            </div> 
        </Col>
    )
}