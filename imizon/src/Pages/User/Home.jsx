// Import Libs
import React, { Fragment }from 'react'
import {Container} from 'react-bootstrap';


// Import Components
import Card from '../../Components/ArticleCard';


//import style 
import "../../Styles/ListingProduct.scss"

const Home = () => {
    const map = () => {
        let map_def = [];
        let row = []

        for (let i = 0; i < 4; i++){
            for (let j = 0; j < 4 ; j++){
            row [j] = i+"-"+j
                if(j == 3){
                    map_def.push(row)
                    row = []
                }
            }
        }
        return map_def 
    }

    // affichage des card sur une ligne

    const renderCards = (cards) => {
        let renderCardRow = cards.map((card, index) => {
            // console.log("info card :")
            // console.log(cards)
          return (
            <Card />
          );
        });
        return renderCardRow
    }


    // decoupage par ligne
    let row  = map();
    let result;
    if(row){
        result = row.map((cards, index) => {
            
        return (
            <div key={Math.random(0, 24)} className="row" >
                {renderCards(cards)} 
            </div>
        )
        })
    }
    // console.log("result")
    // console.log(result)
    return (
        <Fragment>
            <Container>
                {result}
            </Container>
        </Fragment>
    )
}

export default Home