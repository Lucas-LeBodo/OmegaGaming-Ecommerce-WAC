// Import Libs
import axios from 'axios';
import React, { Fragment, useEffect, useState }from 'react'
import {FiUpload, FiSave, FiXCircle} from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';


//import style 
import "../../Styles/UpdateArticles.scss";

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

            axios.get('https://localhost:8000/api/articles/view', {
                params: {id: id}
            }).then((response) => {
                console.log(response)
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
                <div className="container-form">
                <Link to={"/admin/show_articles"}> 	&lt; Back to list</Link>
                    <form>
                        <div className="flex-head">
                            <div className="flex-head-top">
                            <label>Title : <input type="text" id={'title'} placeholder={"Enter a title"} defaultValue={informations.Title} onChange={(event)=>setTitle(event.target.value)}></input></label>    
                            <label>Price : <input type="text" defaultValue={informations.Price} placeholder={"Enter Prices"} onChange={(event)=>setPrice(event.target.value)}></input> </label>
                            </div>
                            <div className="flex-head-bottom">
                            <label>Stocks : <input type="text" defaultValue={informations.Stock} placeholder={"Enter Stock"} onChange={(event)=>setStock(event.target.value)}></input></label>
                            </div>
                        </div>
                        <div className="flex-body">
                            <div className="flex-img">
                                <img src={'image.jpg'} alt={"Image"}></img>
                                <div className="flex-bottom">
                                    <div className="flex-img-button"> 
                                        <Link to={"#"} id="upload"> <FiUpload/> Upload Image </Link>
                                        <Link to={"#"} id="delete"> <RiDeleteBin5Line/> Delete All </Link>
                                    </div>
                                    <div className="other-img">
                                        <div className="image"></div>
                                        <div className="image"></div>
                                        <div className="image"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-bottom-area">
                            <label>Description : <textarea defaultValue={informations.Description} placeholder={"Enter Description"}  onChange={(event)=>setDescription(event.target.value)}></textarea></label>
                            <label>Feature : <textarea defaultValue={informations.Feature} placeholder={"Enter Features"} onChange={(event)=>setFeature(event.target.value)}></textarea></label>
                        </div>
                        <div className="btn">
                            <button onClick={submit} id={"save"}><FiSave /> Update</button>
                            <button onClick={submit} id={"cancel"}><FiXCircle /> Cancel</button>
                            <button onClick={submit} id={"remove"}><RiDeleteBin5Line /> Delete</button>
                        </div>
                          
                    </form>
                </div>
        </Fragment>
    )
}

export default UpdateArticle