import { Col } from "react-bootstrap";

export default function imgDescriptionLong (props){
    return(
        <Col id="image_product">
            <div className="margin"> 
                <img 
                    src={props.img}
                    alt={"image product"+props.img}
                />
            </div> 
        </Col>
    )
}