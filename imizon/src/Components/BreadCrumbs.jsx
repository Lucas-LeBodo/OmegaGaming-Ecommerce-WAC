// Import Libs 
import React, { useState, useEffect, Fragment } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link, useLocation } from "react-router-dom";
import {RiVipCrownLine, RiHome2Line } from "react-icons/ri"
import axios from 'axios';

const BreadCrumbs = (props) =>  {

    let pathname = useLocation().pathname;
    let homePath = ' ';
    let registerPath = ' ';
    let loginPath = ' ';
    let productPath = ' ';
    let bestsellerPath = ' ';
    let id = ' ';
    

    const [article, setArticle] = useState('') 

    //REVOIR 2 à 3 trucs genre l'id si pas sur la page article !

    id = pathname.lastIndexOf("/");
    id = pathname.substr(id + 1);

    useEffect(() => {
        function getName() {
            
            axios.get("http://localhost:8000/api/articles/"+id,{
            }).then((response) => { 
                let information = response.data;
                setArticle(information)
            }).catch((error) => {
                console.log(error)
            })
        }
        getName();

    }, [window.location.pathname])

        
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