// Import Libs
import axios from 'axios';
import React, { Fragment, useEffect }from 'react'
import {Container} from 'react-bootstrap';


// Import Components
import Card from '../../Components/ArticleCard';


//import style 
import "../../Styles/ListingProduct.scss"

const Home = () => {

    useEffect(() => {
        function getMostPopular() {
            axios.get('https://localhost:8000/api/articles/popularity', {
                params: {exist: "oui"}
            }).then((response) => {
                console.log(response.data["hydra:member"]);
            }).catch((error) => {
                console.log(error);
            })
        }

        getMostPopular();
    })

    const map = () => {
        let map_def = [];
        let row = []

        for (let i = 0; i < 4; i++){
            for (let j = 0; j < 4 ; j++){
            row[j] = i+"-"+j
                if(j === 3){
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
            //  console.log("info card :")
            //  console.log(cards.toString()+"\n")
            // console.log(cards)
          return (
            
            <Card key={index} />
          );
        });
        return renderCardRow
    }


    // decoupage par ligne
    let row  = map();
    let result;
    if(row){
        result = row.map((cards, index) => {
            //console.log(cards.toString()+"\n")
        return (
            <div key={cards.toString()} className="row" >
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