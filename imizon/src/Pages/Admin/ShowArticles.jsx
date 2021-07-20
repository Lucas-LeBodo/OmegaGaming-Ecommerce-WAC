// Import Libs 
import React, { useState, useEffect, Fragment } from "react";
import {Container, Pagination} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

// Import Styles 

const ShowArticles = () => {
    const [articles, setArticles] = useState('');
    const [articlesShow, setArticlesShow] = useState('');
    const [views, setViews] = useState('');
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        function getArticles() {
            axios.get('https://localhost:8000/api/articles?page='+page, {
            }).then((response) => {
                setArticles(response.data["hydra:member"]);
                setViews(response.data["hydra:view"]);

                let articles = response.data["hydra:member"];
                let views = response.data["hydra:view"];

                if(articles != [] && views != []) {
                    let max = views["hydra:last"].substr(-1);
                    setMaxPage(max)
                }

                let tabArticles = [];
                articles.forEach(element => {
                    tabArticles.push(
                        <ul className="list-group mb-4">
                            <li>{element.id}</li>
                            <li>{element.Title}</li>
                            <li>{element.Description}</li>
                            <li>{element.Feature}</li>
                            <li>{element.Image}</li>
                            <li>{element.Price}</li>
                        </ul>
                    )
                });
                setArticlesShow(tabArticles);
                
            }).catch((error) => {
                console.log(error);
            })
        }
        getArticles();
    }, [page])

    const changeActive = (event) => {
        let newPage = event.target.innerHTML;
        setPage(newPage);
    }

    //Création Pagination
    let active = page;
    let items = [];
    for (let number = 1; number <= maxPage; number++) {
        items.push(
        <Pagination.Item key={number} active={number === active} value={number} onClick={changeActive}>
          {number}
        </Pagination.Item>,
        );
    }
    
    const paginationBasic = (
    <div>
        <Pagination size="sm">{items}</Pagination>
    </div>
    );

    return (
        <Fragment>
            <Container>
                {articlesShow}
                {paginationBasic}
            </Container>
        </Fragment>
    );
}

export default ShowArticles;