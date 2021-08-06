import React, {useState, useEffect} from 'react';
import {Container, Form} from 'react-bootstrap';

import axios from 'axios';

const CreateCategory = () => {
     const [category, setCategory] = useState('');

     const submit = async () => {
    
        axios.post('http://localhost:8000/api/categories',{
            categoryName: category
        }
        ).then((response) => {
            console.log(response)
            window.location.reload();
        }).catch((error) => {
            console.log(error)
        })
       
    }
    return (
        <Container fluid >
            <Form>
                <h3 style={{marginTop: "5%"}}>Create Category</h3>
                <hr id="hr-form"></hr>
                <div className="form-group">
                    <label>Category Name</label>
                    <input type="text" className="form-control" placeholder={category} onChange={ (event)=>{ setCategory(event.target.value)}} required/>
                </div>
                <div className="btn btn-primary btn-block btn-custom" onClick={ submit } >Create</div>

            </Form>
        </Container>
    )
}

export default CreateCategory