import React, {useEffect, Fragment, useState} from 'react';
import { Container } from "react-bootstrap";
import axios from 'axios';

// Import Components
import SelectionPanel from '../../Components/SelectionPanel'
import CardSearch from '../../Components/CardSearch';
import Card from '../../Components/ArticleCard';


const Search = (props) => {
    const [showArticles, setShowArticles] = useState([]);    
    const [row, setRow] = useState('');
    const [sort, setSort] = useState('')

    let result;
    
    const getArticle = (articles) => {
        
        let allArticles = articles.articles;

        let articlesArr = new Array();
        allArticles.forEach((value, index, array) => {
            articlesArr.push( <CardSearch value={value} callback={getSort} />)
        })
        
        setShowArticles(articlesArr);
        setSort(sort);
    }

    useEffect(() => {
        function getMostPopular() {
            if(sort === 'DESC'){
                axios.get('https://localhost:8000/api/articles/OrderByNameDESC?page=1', {
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
                    setShowArticles(showArticles.sort());
                })
            }else{
                axios.get('https://localhost:8000/api/articles/OrderByNameASC?page=1', {
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
                    setShowArticles(showArticles.sort());
                })
            }
        }
        getMostPopular();
    }, [sort])

    useEffect(() => {
        setRow(map());
    }, [showArticles])
    
    const getSort = (sort) => {
        setSort(sort)
    }

    const map = () => {
            let map_def = [];
            let row = [];
            let nbRow = 1;
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
            // console.log("cards : ")
            // console.log(cards)
            return(
                <div key={ Math.random().toString(36).substring(7)} className="row">
                    {renderCards(cards)}
                </div>
            )
        })
        
    }

    return(
        <Fragment >
            <SelectionPanel callBack={getArticle} sort={getSort}/>
            <Container style={{marginLeft: '30%'}}>{result}</Container>
        </Fragment>
    )

}
export default Search;