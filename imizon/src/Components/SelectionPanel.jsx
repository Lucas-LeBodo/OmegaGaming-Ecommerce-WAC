// Import Libs 
import React, { Fragment, useState, useEffect } from "react";

import axios from 'axios';


export default function AnimatedMulti(props) {

  const [categories, setCategories] = useState('');
  const [selectCategory, setSelectCategory] = useState('');
  const [sort, setSort] = useState('')
  
  useEffect(() => {
    let pages = 1;
    const getCategories = () => {
      axios.get('http://localhost:8000/api/categories?page='+ pages ,{
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
        <div key={Math.random().toString(36).substring(7)}><label><input type="checkbox" value={category.id} onChange={event => {setSelectCategory(event.target.value)}}/> {category.category_name }</label></div>
        )
    })
  }
  options.push(result)


  useEffect(() => {
    if(selectCategory !== ''){
      axios.get('http://localhost:8000/api/categories/' + selectCategory ,{
        }).then((response) => {
          props.callBack(response.data)
        })
    }
  }, [selectCategory])

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
                      <div><label><input type="radio" value="ASC" name="sort" onChange={event => {setSort(event.target.value)}} /> A-Z </label></div>
                      <div><label><input type="radio" value="DESC" name="sort" onChange={event => {setSort(event.target.value)}}/> Z-A </label></div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  );
}

