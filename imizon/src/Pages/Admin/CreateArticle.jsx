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

    // ajout de references
    const [reference, setReference] = useState('')
    const [pageRef, setPageRef] = useState(1)
    const [allRef, setAllRef] = useState('')
    const [featureSup, setFeatureSup] = useState('')
    const [titleRef, setTitleRef] = useState('')

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

        const recupReferences = () => {
            axios.get('http://localhost:8000/api/articles/recupReferences?page='+ pages ,{    
            }).then((response) => {
                setAllRef(response.data["hydra:member"]);
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
        recupReferences();
        recupCategory();
    }, [])

    // creation des options pour le select category
    let result;
    if(categories != ''){
        result = categories.map((category) => {
            return(
                <option value={'\/api\/categories\/'+category.id} key={Math.random().toString(36).substring(7)}>{category.categoryName}</option>
            )
        })
    }

    // creation des options pour le select references
    let resultRef;
    if(allRef != ''){
        resultRef = allRef.map((refs) => {
            return(
                <option value={refs.sameArticles} key={Math.random().toString(36).substring(7)}>{refs.sameArticles}</option>
            )
        })
    }

    const cocher = () => {
        let disabled = document.getElementById('selectRef').disabled;
        if(disabled){
            document.getElementById('selectRef').disabled = false;
            document.getElementById('featureSup').disabled = false;
        }else{
            document.getElementById('selectRef').disabled = true;
            document.getElementById('featureSup').disabled = true;

        }
    }

    
    const desactivateCheckbox = (event) => {
        let select = event.target.value
        if(select !== ''){
            document.getElementById('ref_checke').disabled = true;
        }else{
            document.getElementById('ref_checke').disabled = false;
        }
    }
    
    
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });


    const submit = async () => {
        const file = document.getElementById('myFile').files[0];
        
        let mb64File =  await toBase64(file);
        let checked = document.getElementById("ref_checke").checked;
       
        if(checked){
            setReference(title);
            axios.post('http://localhost:8000/api/articles',{
                Title: title,
                Description: description,
                Image: mb64File,
                Feature: feature,
                Price: parseInt(price),
                Stock: parseInt(stock),
                category: selectCategory,
                sameArticles: reference
            }
            ).then((response) => {
                console.log(response)
                //window.location.reload();
            }).catch((error) => {
                console.log(error)
            })
        }else {
            axios.post('http://localhost:8000/api/articles',{
                Title: title,
                Description: description,
                Image: mb64File,
                Feature: feature,
                Price: parseInt(price),
                Stock: parseInt(stock),
                category: selectCategory,
                sameArticles: titleRef,
                featureDiff: featureSup
            }
            ).then((response) => {
                console.log(response)
                window.location.reload();
            }).catch((error) => {
                console.log(error)
            })
        }
       
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
                <div className="form-group">
                    <label>
                        Create a reference :
                        <input type="checkbox" id="ref_checke" name="ref" onClick={() => {cocher()}}/> 
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Add to a reference :
                        <select name="reference" id="selectRef" className="form-control" onChange={ (event)=>{ desactivateCheckbox(event); setTitleRef(event.target.value)}} >
                            <option value="">-- Chose reference --</option>
                            {resultRef}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Additional feature  :
                        <input id="featureSup" type="textarea" className="form-control" placeholder={feature} onChange={ (event)=>{ setFeatureSup(event.target.value)}} required/>
                    </label>
                </div>

                <div className="btn btn-primary btn-block btn-custom" onClick={ submit } >Create</div>
            </Form>
        </Container>
    )
}

export default CreateArticle
