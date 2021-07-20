// Import Libs 
import React, { useState, useEffect, Fragment } from "react";
import {Container, Pagination} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai';

// Import Styles 
import "../../Styles/ListingAdmin.scss";


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
                console.log(articles)
                articles.forEach(element => {
                    tabArticles.push(
                            <div className="article-card" key={element.id + "article_card"}>
                                <div className="article-img" key={element.id + "div_article_img"}>
                                    <img src={element.Image} alt={'image'} key={element.id + "article_img"}></img>
                                </div>
                                <div className="article-card-content" key={element.id + "article_content_card"}>
                                    <div className="head-card" key={element.id + "article_head_card"}>
                                        <div className="article-title" key={element.id + "article_title"}>
                                            <h3 key={element.id + "article_title_h3"}>{element.Title}</h3>
                                        </div>
                                        <div className="article-price" key={element.id + "article_price"}>
                                            {element.Price} €
                                        </div>
                                        <div className="article-stock" key={element.id + "article_stock"}>
                                           Stock :  {/* ICI POUR LE STOCK */}
                                        </div>
                                        <div className="article-id" key={element.id + "article_id"}>
                                            ID : {element.id}
                                        </div>
                                    </div>
                                    <div className="article-card-footer" key={element.id + "article_card_footer"}>
                                        <div className="article-desc" key={element.id + "article_desc"}>
                                            <p key={element.id + "article_desc_p"}>{element.Description}</p>
                                        </div>
                                        <div className="article-button" key={element.id + "article_button"}>
                                            <Link to={'#'} className="nav-link"><AiFillEdit/></Link>
                                            <Link to={'#'} className="nav-link"><AiFillDelete/></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
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