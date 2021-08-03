import React, {useEffect, Fragment, useState, useReducer} from 'react';
import { Container } from "react-bootstrap";

// Import Components
import SelectionPanel from '../../Components/SelectionPanel'
import CardSearch from '../../Components/CardSearch';




const Search = (props) => {
    const [showArticles, setShowArticles] = useState([]);    
    const [row, setRow] = useState('');
    let result;
    
    const getArticle = (articles) => {
        
        let allArticles = articles.articles;
        let articlesArr = new Array();
        allArticles.forEach((value, index, array) => {
            articlesArr.push( <CardSearch value={value} />)
        })
        setShowArticles(articlesArr);
    }

    useEffect(() => {
        setRow(map());
    }, [showArticles])
    
    const map = () => {
            let map_def = [];
            let row = [];
            let nbRow = 1;
            console.log(showArticles.length > 3)
            if(showArticles.length >= 3){
                nbRow = Math.ceil(showArticles.length/3);
                for (let i = 0; i < nbRow; i++){
                    for (let j = 0; j < 3 ; j++){
                    row [j] = showArticles[j]
                        if(j == 2 ){
                            map_def.push(row)
                            row = []
                            showArticles.splice(0, 3);
                        }
                    }
                }
            }else{
                for (let i = 0; i < nbRow; i++){
                    for (let j = 0; j < 3 ; j++){
                    row [j] = showArticles[j]
                        if(j == 2){
                            map_def.push(row)
                            row = []
                        }
                    }
                }
            }
           
            console.log("map_def")
            console.log(map_def)
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


    if(row != ''){
        result = row.map((cards, index) => {
            console.log("cards : ")
            console.log(cards)
            return(
                <div key={ Math.random().toString(36).substring(7)} className="row">
                    {renderCards(cards)}
                </div>
            )
        })
        
    }
    return(
        <Fragment >
            <SelectionPanel callBack={getArticle}/>
            <Container>{result}</Container>
        </Fragment>
    )

}
export default Search;