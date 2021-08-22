import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CreateArticle = () => {

    // remplir le formulaire
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [feature, setFeature] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState(0);
    const [stock, setStock] = useState('');
    const [selectCategory, setSelectCategory] = useState('');
    const [weight, setWeight] = useState('');


    //affichage des categories
    const [categories, setCategories] = useState('');

    // ajout de references
    const [reference, setReference] = useState('')
    const [allRef, setAllRef] = useState('')
    const [featureSup, setFeatureSup] = useState('')
    const [titleRef, setTitleRef] = useState('')

   useEffect(() => {

        // recup categories
        let pages = 1;
        const recupCategory = () => {
            axios.get('https://localhost:8000/api/categories?page='+ pages ,{
            }).then((response) => {
                setCategories(response.data["hydra:member"]);
            })
        }

        const recupReferences = () => {
            axios.get('https://localhost:8000/api/articles/recupReferences?page='+ pages ,{    
            }).then((response) => {
                setAllRef(response.data["hydra:member"]);
            })
        }
        recupReferences();
        recupCategory();
    }, [])
 
    // creation des options pour le select category
    let result;
    if(categories !== ''){
        result = categories.map((category) => {
            return(
                <option value={'\/api\/categories\/'+category.id} key={Math.random().toString(36).substring(7)}>{category.categoryName}</option>
            )
        })
    }

    // creation des options pour le select references
    let resultRef;
    if(allRef !== ''){
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
            axios.post('https://localhost:8000/api/articles',{
                Title: title,
                Description: description,
                Image: mb64File,
                Feature: feature,
                Price: parseInt(price),
                Stock: parseInt(stock),
                category: selectCategory,
                sameArticles: reference,
                weight: parseInt(weight),
                discount: parseInt(discount)
            }
            ).then((response) => {
                console.log(response)
                window.location.reload();
            }).catch((error) => {
                console.log(error)
            })
        }else {
            axios.post('https://localhost:8000/api/articles',{
                Title: title,
                Description: description,
                Image: mb64File,
                Feature: feature,
                Price: parseInt(price),
                Stock: parseInt(stock),
                category: selectCategory,
                sameArticles: titleRef,
                featureDiff: featureSup,
                weight: parseInt(weight),
                discount: parseInt(discount)
            }
            ).then((response) => {
                window.location.reload();
            }).catch((error) => {
                console.log(error)
            })
        }
       
    }

    return (
        <div className="container-form">
            <Link to={"/admin/show_articles"}> 	&lt; Back to list</Link>
            <div className="flex-head">
                <div className="flex-head-top">
                    <input type="text" className="form-control" placeholder={"title"} onChange={ (event)=>{ setTitle(event.target.value)}} required/>
                    <input type="textarea" className="form-control" id={'textarea'}placeholder={"description"} onChange={ (event)=>{ setDescription(event.target.value)}} required/>
                    <input type="textarea" className="form-control" id={'textarea'} placeholder={"feature"} onChange={ (event)=>{ setFeature(event.target.value)}} required/>
                    <input type="number" className="form-control" placeholder={"stock"} min="0" onChange={ (event)=>{ setStock(event.target.value)}} required/>
                    <input type="number" className="form-control" placeholder={"price"} onChange={ (event)=>{ setPrice(event.target.value)}} min="0" required/>
                    <input type="number" className="form-control" placeholder={"weight"} onChange={ (event)=>{ setWeight(event.target.value)}} min="0" required/>
                    <div className="form-group">
                    <select name="category" className="form-control" onChange={ (event)=>{ setSelectCategory(event.target.value)}}>
                        <option value="">-- Category --</option>
                        {result}
                    </select>
                    <input type="file" id="myFile" className="form-control" required/>
                </div>
                </div>
                <input type="number" className="form-control" placeholder={"discount"} min="0" max="100" onChange={ (event)=>{ setDiscount(event.target.value)}} required/>
                <div className="form-group">
                        Create a reference :
                        <input type="checkbox" id="ref_checke" name="ref" onClick={() => {cocher()}}/> 
                </div>
                <div className="form-group">
                        <select name="reference" id="selectRef" className="form-control" onChange={ (event)=>{ desactivateCheckbox(event); setTitleRef(event.target.value)}} >
                            <option value="">-- Chose reference --</option>
                            {resultRef}
                        </select>
                </div>
                <div className="form-group">
                        <input id="featureSup" type="textarea" className="form-control" placeholder={"feature"} onChange={ (event)=>{ setFeatureSup(event.target.value)}} required/>
                </div>

                <div className="btn btn-primary btn-block btn-custom" onClick={ submit } >Create</div>
            </div>
        </div>
    )
}

export default CreateArticle
