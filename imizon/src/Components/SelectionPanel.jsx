// Import Libs 
import React, { Fragment, useState, useEffect } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import axios from 'axios';


export default function AnimatedMulti() {
  const [categories, setCategories] = useState('');
  const [maxPages, setMaxPages] = useState('');
  const [pages, setPages] = useState(1);
  const [selectCategory, setSelectCategory] = useState('');
  const [articlesByCategory, setArticlesByCategory] = useState('')
  let views;
  
  useEffect(() => {
    const getCategories = () => {
      axios.get('http://localhost:8000/api/categories?page='+ pages ,{
      }).then((response) => {
          setCategories(response.data["hydra:member"]);
          if(response.data["hydra:view"] !== undefined){
              views = response.data["hydra:view"];
          }
          
          if(categories !== [] && views !== [] && views !== undefined) {
              if(views["hydra:last"] !== undefined) {
                  let max = views["hydra:last"].substr(-1);
                  setMaxPages(max)
              }
          }
      })
    }
    getCategories();

  }, [])
  
  let result;
  let options = [];
  if(categories != ""){
    result = categories.map((category) => {
        return(
          { value: category.id, label: category.category_name }
        )
    })
  }
  options.push(result)

  console.log(options);


const animatedComponents = makeAnimated();
console.log(selectCategory)

if(selectCategory != ''){
  axios.get('http://localhost:8000/api/categories/' + selectCategory ,{

  }).then((response) => {
    setArticlesByCategory(response.data);
  })
}


  return (
      <Fragment>
        <div className="Panel">
            <div className="Panel-content">
                <div className="category-control">
                    <h3> Category </h3>
                    <Select closeMenuOnSelect={false} components={animatedComponents} isMulti options={options[0]} className={'selectCategory'} onChange={(event) => {setSelectCategory(event[0].value)}}/>  
                </div>
                <div className="sort-control">
                    <h3> Sort </h3>
                    <label><input type="radio" value="option1"/> Option 1 </label>
                    <label><input type="radio" value="option1"/> Option 2 </label>

                </div>
            </div>
        </div>
    </Fragment>
  );
}

