// Import Libs 
import React, { useState, useEffect, Fragment } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link, useLocation } from "react-router-dom";
import {RiVipCrownLine, RiHome2Line, RiMoneyDollarBoxLine } from "react-icons/ri"
import axios from 'axios';

const BreadCrumbs = (props) =>  {

    let pathname = useLocation().pathname;
    let homePath = ' ';
    let registerPath = ' ';
    let loginPath = ' ';
    let productPath = ' ';
    let bestsellerPath = ' ';
    let id = ' ';
    let discount = '';
    let path = pathname.split(/[\/]+/g)
    const [article, setArticle] = useState('') 
   
   
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
    
        if(id.length < 3){
            getName();
        }

    }, [pathname])
    
    if(pathname === "/"){
        homePath = <Link  to={"/"}> <RiHome2Line/> Home </Link>;
    }

    if(pathname.startsWith("/product")){
        homePath = <Link  to={"/"}> <RiHome2Line/> Home </Link>;
        productPath = <Link  to={`/product/${id}`}> {article.Title} </Link>;
    }
    if(pathname === "/best-seller"){
        homePath = <Link  to={"/"}> <RiHome2Line/> Home </Link>;
        bestsellerPath = <Link  to={"/best-seller"}> <RiVipCrownLine/> Best Sellers</Link>;
    }
    if(pathname === "/discount"){
        homePath = <Link  to={"/"}> <RiHome2Line/> </Link>;
        discount = <Link  to={"/discount"}> <RiMoneyDollarBoxLine/> Promo</Link>;
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
                    {discount}        
                </Breadcrumbs>
            </div>
        </Fragment>
    );
}

export default BreadCrumbs;