import { Row, Col } from "react-bootstrap";


export default function description (props) {
    return(
        <Col id="description_product">
            <Row> 
                <div className="margin"> 
                    <p>
                        <b>Intel Core i5 10600K :</b> Turbulent, 
                        bagarreur et hyperactif, le processeur 
                        Intel Core i5 10600K est l’enfant 
                        terrible de la 10ème génération de 
                        processeurs Intel Core. Il délivre des 
                        performances haut de gamme grâce à ses 
                        6 cœurs / 12 threads ultra-véloces, 12 Mo
                        de cache L3 et une fréquence native 
                        de 4,10 Ghz (jusqu’à 4,80 GHz en Turbo !).
                        <br />
                        <br />
                        <b>Mémoire 16 Go DDR4 :</b> 16 Go pour un système 
                        qui respire et un multitâches qui réagi au 
                        quart de tour.
                        <br />
                        <br />
                        <b>SSD NVMe 1 To : </b>Un stockage 100% mémoire
                        flash pour un démarrage éclair, des transferts 
                        hyper rapides et des parties qui se lancent en 
                        un clin d’oeil.
                        <br />
                        <br />
                    </p>
                </div> 
            </Row>
        </Col>
    )
}