import React, {useState, useEffect} from 'react';
import {Container, Form} from 'react-bootstrap';

import axios from 'axios';

const CreateArticle = () => {

    // remplir le formulaire
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [feature, setFeature] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [selectCategory, setSelectCategory] = useState('');


    //affichage des categories
    const [pages, setPages] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [categories, setCategories] = useState('');
    let views;

   useEffect(() => {

        // recup categories
        const recupCategory = () => {
            axios.get('https://localhost:8000/api/categories?page='+ pages ,{
                
            }).then((response) => {
                setCategories(response.data["hydra:member"]);
                if(response.data["hydra:view"] !== undefined){
                    views = response.data["hydra:view"];
                }
                
                if(categories !== [] && views !== [] && views !== undefined) {
                    if(views["hydra:last"] !== undefined) {
                        let max = views["hydra:last"].substr(-1);
                        setMaxPage(max)
                    }
                }
            })
        }
        recupCategory();
    }, [])


    // creation des options pour le select category
    let result;
    if(categories != ''){
        result = categories.map((category) => {
            console.log(category.categoryName)
            return(
                <option value={'\/api\/categories\/'+category.id} key={Math.random().toString(36).substring(7)}>{category.categoryName}</option>
            )
        })
    }
    console.log(result)
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });



    const submit = async () => {
        const file = document.getElementById('myFile').files[0];
        
        let mb64File =  await toBase64(file);

        axios.post('https://localhost:8000/api/articles',{
            Title: title,
            Description: description,
            Image: mb64File,
            Feature: feature,
            Price: parseInt(price),
            Stock: parseInt(stock),
            category: selectCategory

        }
        ).then((response) => {
            console.log(response)
            window.location.reload();
        }).catch((error) => {
            console.log(error)
        })
       
    }

    return (
        <Container fluid className="signup">
            <Form>
                <h3>Create Article</h3>
                <hr id="hr-form"></hr>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" placeholder={title} onChange={ (event)=>{ setTitle(event.target.value)}} required/>
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select name="category" className="form-control" onChange={ (event)=>{ setSelectCategory(event.target.value)}}>
                        <option value="">-- Category --</option>
                        {result}
                    </select>
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="file" id="myFile" className="form-control" required/>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="textarea" className="form-control" placeholder={description} onChange={ (event)=>{ setDescription(event.target.value)}} required/>
                </div>
                <div className="form-group">
                    <label>Features</label>
                    <input type="textarea" className="form-control" placeholder={feature} onChange={ (event)=>{ setFeature(event.target.value)}} required/>
                </div>
                <div className="form-group">
                    <label>Stock</label>
                    <input type="number" className="form-control" placeholder={stock} onChange={ (event)=>{ setStock(event.target.value)}} required/>
                </div>
                <div className="form-group">
                    <label>Price (€)</label>
                    <input type="number" className="form-control" placeholder={price} onChange={ (event)=>{ setPrice(event.target.value)}} required/>
                </div>

                <div className="btn btn-primary btn-block btn-custom" onClick={ submit } >Create</div>
            </Form>
        </Container>
    )
}

export default CreateArticle
