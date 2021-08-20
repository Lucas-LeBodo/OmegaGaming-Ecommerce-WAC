// Import Libs 
import React, { useState, useEffect, Fragment } from "react";
import {AiFillDelete, AiFillEdit} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import axios from 'axios';

const ShowCategories = () => {
    const [page, setPage] = useState(1);
    const [allCategories, setAllCategories] = useState('')
    useEffect(() => {
        axios.get('http://localhost:8000/api/categories?page='+page, {
        }).then((response) => {
            let categories = response.data["hydra:member"];
            let listCategory = [];
            if(categories.length > 0){
                categories.forEach((cat) => {
                    listCategory.push(
                        <div key={ Math.random().toString(36).substring(7)}  className="container-card" >
                                <h3 key={Math.random().toString(36).substring(7)} >{cat.category_name} <Link to={'/admin/show_category/update/'+ cat.id}><AiFillEdit/></Link></h3>
                        </div>
                    )
                })
                setAllCategories(listCategory)
            }
        })
    }, [])
    console.log(allCategories)

    return (
        <Fragment>
            {allCategories}
        </Fragment>
    )
}
export default ShowCategories;