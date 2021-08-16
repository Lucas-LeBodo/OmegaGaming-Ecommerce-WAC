// Import Libs 
import React, { Fragment, useState, useEffect } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import axios from 'axios';


export default function AnimatedMulti(props) {

  const [categories, setCategories] = useState('');
  const [selectCategory, setSelectCategory] = useState('');
  const [sort, setSort] = useState('')
  
  useEffect(() => {
    let pages = 1;
    const getCategories = () => {
      axios.get('https://localhost:8000/api/categories?page='+ pages ,{
      }).then((response) => {
          setCategories(response.data["hydra:member"]);
      })
    }    
    getCategories();
  }, [])
  
  let result;
  let options = [];
  if(categories !== ""){
    result = categories.map((category) => {
      return(
        <div key={Math.random().toString(36).substring(7)}><label><input type="checkbox" onChange={event => {setSort(event.target.value)}}/> {category.category_name }</label></div>
        )
    })
  }
  options.push(result)


  useEffect(() => {
    if(selectCategory !== ''){
      axios.get('https://localhost:8000/api/categories/' + selectCategory ,{
        }).then((response) => {
          props.callBack(response.data)
        })
    }
  }, [selectCategory, props])

  if(sort){
    props.sort(sort)
  }

  return (
      <Fragment>
        <div className="Panel">
            <div className="Panel-content">
                <div className="category-control">
                    <h3> Category </h3>
                   <div className="category-container">{result}</div> 
                </div>
                <div className="sort-control">
                    <h3> Sort </h3>
                    <div className="sort-container">
                      <div><label><input type="checkbox" value="ASC" onChange={event => {setSort(event.target.value)}}/> A-Z </label></div>
                      <div><label><input type="checkbox" value="DESC" onChange={event => {setSort(event.target.value)}}/> Z-A </label></div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  );
}

