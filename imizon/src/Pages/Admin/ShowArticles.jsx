// Import Libs 
import React, { useState, useEffect, Fragment } from "react";
import {Pagination} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai';




const ShowArticles = () => {
    const [articlesShow, setArticlesShow] = useState('');
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    
    useEffect(() => {
        let views

        function getArticles() {
            axios.get('http://localhost:8000/api/articles?page='+page, {
            }).then((response) => {
                let articles = response.data["hydra:member"];
                if(response.data["hydra:view"] !== undefined){
                    views = response.data["hydra:view"];
                }
                
                if(articles !== [] && views !== [] && views !== undefined) {
                    if(views["hydra:last"] !== undefined) {
                        let max = views["hydra:last"].substr(-1);
                        setMaxPage(max)
                    }
                }

                let tabArticles = [];
                articles.forEach(element => {
                    let discount = ""
                    if(element.discount === null) {
                        discount = 0
                    } else {
                        discount = element.discount + "%"
                    }
                    tabArticles.push(
                        <div className="article-card" key={element.id + "article_card"}>
                            <div className="article-img" key={element.id + "div_article_img"}>
                                <img src={element.Image} alt={'image'+element.id} key={element.id + "article_img"}></img>
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
                                        Stock :  {element.Stock}
                                    </div>
                                    <div className="article-stock" key={element.View + "article_view"}>
                                        View : {element.View}
                                    </div>
                                    <div className="article-stock" key={element.discount + "article_discount"}>
                                        Discount : {discount}
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
                                        <Link to={'show_article/update/'+element.id} className="nav-link"><AiFillEdit/></Link>
                                        <Link to={'#'} onClick={() => deleteArticles(element.id)} className="nav-link"><AiFillDelete/></Link>
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

    const deleteArticles = (id) => {
        console.log(id)
        axios.delete('http://localhost:8000/api/articles/'+id, {
            data : {id:id}
        }).then((response) => {
            window.location.reload()
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Fragment>
            <div className="container-card">
                {articlesShow}
                {paginationBasic}
            </div>
        </Fragment>
    );
}

export default ShowArticles;