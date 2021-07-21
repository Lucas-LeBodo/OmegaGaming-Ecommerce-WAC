// Import Libs
import axios from 'axios';
import React, { Fragment, useEffect, useState }from 'react'
import {Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';


//import style 

const UpdateArticle = () => {
    const [informations, setInformations] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [feature, setFeature] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [id, setId] = useState('');


    useEffect(() => {
        function getInformations() {
            let location = document.location.href;
            let id = location.substr(-1);
            setId(id);
            axios.get('https://localhost:8000/api/articles/'+id, {

            }).then((response) => {
                let information = response.data;
                setInformations(information)
                setTitle(information.Title)
                setDescription(information.Description)
                setFeature(information.Feature)
                setPrice(information.Price)
                setStock(information.Stock)
            }).catch((error) => {
                console.log(error)
            })
        }

        getInformations();
    }, [])

    const submit = (event) => {
        event.preventDefault();
        axios.put('https://localhost:8000/api/articles/'+id,{
            Title: title,
            Description: description,
            Feature: feature,
            Price: parseInt(price),
            Stock: parseInt(stock)
        }).then((response) => {
            console.log(response);
            window.location.reload()
        }).catch((error) => {
            console.log(error);
        })
    }


    return (
        <Fragment>
            <Container>
                <Link to={"/admin/show_articles"}>Back to list</Link>
                <ul>
                    <li className="text-primary">{informations.Title}</li>
                    <li className="text-primary">{informations.Description}</li>
                    <li className="text-primary">{informations.Stock}</li>
                    <li className="text-primary">{informations.Price}</li>
                    <li className="text-primary">{informations.Feature}</li>
                    <li className="text-primary">{informations.Image}</li>
                </ul>
                <form>
                    <label>Titre</label>
                    <input type="text" defaultValue={informations.Title} onChange={(event)=>setTitle(event.target.value)}></input>
                    <label>Description</label>
                    <textarea defaultValue={informations.Description} onChange={(event)=>setDescription(event.target.value)}></textarea>
                    <label>Caractéristique</label>
                    <textarea defaultValue={informations.Feature} onChange={(event)=>setFeature(event.target.value)}></textarea>
                    <label>Prix</label>
                    <input type="text" defaultValue={informations.Price} onChange={(event)=>setPrice(event.target.value)}></input>
                    <label>Stock</label>
                    <input type="text" defaultValue={informations.Stock} onChange={(event)=>setStock(event.target.value)}></input>

                    <button onClick={submit}>UPDATE</button>
                </form>
            </Container>
        </Fragment>
    )
}

export default UpdateArticle