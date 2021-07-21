import React, {useState} from 'react';
import {Container, Form} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';

import axios from 'axios';

const CreateArticleForm = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [feature, setFeature] = useState('');
    const [price, setPrice] = useState('');
    const history = useHistory();

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const submit = async () => {
    // fetch a faire a l'api 
        const file = document.getElementById('myFile').files[0];
        
        let mb64File =  await toBase64(file);

        console.log("ici");
        console.log(typeof title); 
        console.log(typeof description)
        console.log(typeof mb64File);
        console.log(typeof feature)
        console.log(typeof parseInt(price))

        axios.post('https://localhost:8000/api/createArticle',{
            Title : title,
            Description : description,
            Image : mb64File,
            Feature : feature,
            Price : parseInt(price)
        }
        ).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
       
        setTitle('');
        setDescription('');
        setFeature('');
        setPrice('');
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
                    <label>Image</label>
                    <input type="file" id="myFile" className="form-control"  required/>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input type="textarea" className="form-control" placeholder={description} onChange={ (event)=>{ setDescription(event.target.value)}}/>
                </div>

                <div className="form-group">
                    <label>Features</label>
                    <input type="textarea" className="form-control" placeholder={feature} onChange={ (event)=>{ setFeature(event.target.value)}}/>
                </div>

                <div className="form-group">
                    <label>Price ($)</label>
                    <input type="number" className="form-control" placeholder={price} onChange={ (event)=>{ setPrice(event.target.value)}} required/>
                </div>

                <div className="btn btn-primary btn-block btn-custom" onClick={ submit } >Create</div>
            </Form>
        </Container>
    )
}

export default CreateArticleForm
