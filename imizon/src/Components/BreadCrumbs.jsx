// Import Libs 
import React, { useState, useEffect, Fragment } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link, useLocation } from "react-router-dom";
import {RiVipCrownLine, RiHome2Line } from "react-icons/ri"
import axios from 'axios';




// Import Styles 
import '../Styles/BreadCrumbs.scss';


const BreadCrumbs = (props) =>  {
    console.log(props)

    let pathname = useLocation().pathname;
    let homePath = ' ';
    let registerPath = ' ';
    let loginPath = ' ';
    let productPath = ' ';
    let bestsellerPath = ' ';
    let id = ' ';
    

    const [article, setArticle] = useState('') 

    id = pathname.lastIndexOf("/");
    id = pathname.substr(id + 1);

    function getName() {
        
        axios.get("https://localhost:8000/api/articles/"+id,{
        }).then((response) => { 
            let information = response.data;
            setArticle(information)
        }).catch((error) => {
            console.log(error)
        })
    }
    getName();
        
    if(pathname === "/"){
        homePath = <Link  to={"/"}> <RiHome2Line/> </Link>;
    }

    if(pathname.startsWith("/product")){
        homePath = <Link  to={"/"}> <RiHome2Line/> </Link>;
        productPath = <Link  to={`/product/${id}`}> {article.Title} </Link>;
    }
    if(pathname === "/best-seller"){
        homePath = <Link  to={"/"}> <RiHome2Line/> </Link>;
        bestsellerPath = <Link  to={"/best-seller"}> <RiVipCrownLine/> Best Sellers</Link>;
    }

      
    return (
        <Fragment >
            <div className="Ariane">
                <Breadcrumbs aria-label="breadcrumb">
                    {homePath}
                    {loginPath}
                    {registerPath}
                    {productPath}
                    {bestsellerPath}        
                </Breadcrumbs>
            </div>
        </Fragment>
    );
}

export default BreadCrumbs;