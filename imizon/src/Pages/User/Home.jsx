// Import Libs
import axios from 'axios';
import React, { Fragment, useEffect, useState }from 'react'
import {Container} from 'react-bootstrap';


// Import Components
import Card from '../../Components/ArticleCard';


const Home = () => {
    const [showArticles, setShowArticles] = useState('');
    let result;
    useEffect(() => {
        function test() {
            axios.get('https://localhost:8000/api/shippy',{
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        }
        test()


        function getMostPopular() {
            axios.get('https://localhost:8000/api/articles/popularity', {
                params: {exist: "oui"}
            }).then((response) => {
                let articles = response.data["hydra:member"];
                let showArticles = [];
                articles.forEach(element => {
                    showArticles.push(
                        <Card key={element.id} 
                              id={element.id}
                              title={element.Title}
                              image={element.Image}
                              description={element.Description}
                              price={element.Price}
                        />
                    )
                });
                setShowArticles(showArticles);
            }).catch((error) => {
                //console.log(error);
            })
        }
        
        getMostPopular();
    },[])

    const map = () => {
        let map_def = [];
        let row = [];
        let nbRow = 1;

        if(showArticles.length > 4){
            nbRow = Math.ceil(showArticles.length/4);
            for (let i = 0; i < nbRow; i++){
                for (let j = 0; j < 4 ; j++){
                row[j] = showArticles[j]
                    if(j === 3 ){
                        map_def.push(row)
                        row = []
                        showArticles.splice(0, 4);
                    }
                }
            }
        }else{
            for (let i = 0; i < nbRow; i++){
                for (let j = 0; j < 4 ; j++){
                row[j] = showArticles[j]
                    if(j === 3){
                        map_def.push(row)
                        row = []
                    }
                }
            }
        }
        // console.log("map_def")
        // console.log(map_def)
        return map_def 
    }

    const renderCards = (cards) => {
        let renderCardRow = cards.map((card, index) => {
            return(
                <div key={ Math.random().toString(36).substring(7)}>
                    {card}
                </div>
            )
        });
        return renderCardRow
    }


    let row  = map();
   
    if(row){
        result = row.map((cards, index) => {
            // console.log("cards : ")
            // console.log(cards)
            return(
                <div key={ Math.random().toString(36).substring(7)} className="row">
                    {renderCards(cards)}
                </div>
            )
        })
        
    }



    return (
        <Fragment>
            <Container>
                {result}
            </Container>
        </Fragment>
    )
}

export default Home