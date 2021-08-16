// Import Libs
import axios from 'axios';
import React, { Fragment, useEffect, useState }from 'react'
import { FiSave, FiXCircle} from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link, useHistory } from 'react-router-dom';




const UpdateArticle = (props) => {
    const [informations, setInformations] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [feature, setFeature] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [id, setId] = useState('');
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [weight, setWeight] = useState('');
    const [discount, setDiscount] = useState(0)

    //affichage des categories
    const [pages, setPages] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [selectCategory, setSelectCategory] = useState('');
    const [categories, setCategories] = useState('');
    let views;
    const history = useHistory();


    useEffect(() => {
        function getInformations() {
            let id = props.match.params.id
            setId(id);
            
            axios.get('http://localhost:8000/api/articles/'+id, {
            }).then((response) => {
                console.log(response)
                let information = response.data;
                setInformations(information)
                setTitle(information.Title)
                setDescription(information.Description)
                setFeature(information.Feature)
                setPrice(information.Price)
                setStock(information.Stock)
                setImage(information.Image)
                setCategory(information.category.category_name)
                setDiscount(information.discount)
            }).catch((error) => {
                console.log(error)
            })
        }

        const recupCategory = () => {
            axios.get('http://localhost:8000/api/categories?page='+ pages ,{
                
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

        getInformations();
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
    


    const submit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8000/api/articles/'+id,{
            Title: title,
            Description: description,
            Feature: feature,
            Price: parseInt(price),
            Stock: parseInt(stock),
            category: selectCategory,
            weight: parseInt(weight),
            discount: parseInt(discount),
        }).then((response) => {
            window.location.reload()
        }).catch((error) => {
            console.log(error);
        })
    }

    const deleteArticles = (event) => {
        event.preventDefault();
        axios.delete('http://localhost:8000/api/articles/'+id, {
            data : {id:id}
        }).then((response) => {
            history.push("/admin/show_articles");
        }).catch((error) => {
            console.log(error)
        })
    }

    const cancelUpdate = (event) => {
        event.preventDefault();
        window.location.reload()
    }

    // METTRE les images à part en BDD !
    // CSS du bouton input file

    return (
        <Fragment>
                <div className="container-form">
                <Link to={"/admin/show_articles"}> 	&lt; Back to list</Link>
                    <form>
                        <div className="flex-head">
                            <div className="flex-head-top">
                            <label>Title : <input type="text" id={'title'} placeholder={"Enter a title"} defaultValue={informations.Title} onChange={(event)=>setTitle(event.target.value)}></input></label>    
                            <label>Price : <input type="text" defaultValue={informations.Price} placeholder={"Enter Prices"} onChange={(event)=>setPrice(event.target.value)}></input> </label>
                            <label>Weight : <input type="text" defaultValue={informations.weight} placeholder={"Enter Weight"} onChange={(event)=>setWeight(event.target.value)}></input> </label>
                            <label>Discount : <input type="number" defaultValue={informations.discount} placeholder={"Enter Discount %"} onChange={(event)=>setDiscount(event.target.value)}></input>%</label>
                            </div>
                            <div className="flex-head-bottom">
                            <label>Stocks : <input type="number" defaultValue={informations.Stock} placeholder={"Enter Stock"} onChange={(event)=>setStock(event.target.value)}></input></label>
                            </div>
                        </div>
                        <div className="flex-body">
                            <div className="flex-img">
                                <img src={image} alt={"Image"}></img>
                                <div className="flex-bottom">
                                    <div className="flex-img-button"> 
                                        <input type="file" id="myFile" className="form-control" required/>
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
                            <label>
                                Category : 
                                <select onChange={ (event)=>{ setSelectCategory(event.target.value)}} >
                                    <option> --- Chose category --- </option>
                                    {result}
                                </select> 
                            </label>
                            <label>Description : <textarea defaultValue={informations.Description} placeholder={"Enter Description"}  onChange={(event)=>setDescription(event.target.value)}></textarea></label>
                            <label>Feature : <textarea defaultValue={informations.Feature} placeholder={"Enter Features"} onChange={(event)=>setFeature(event.target.value)}></textarea></label>
                        </div>
                        <div className="btn">
                            <button onClick={deleteArticles} id={"remove"}><RiDeleteBin5Line /> Delete</button>
                            <button onClick={cancelUpdate} id={"cancel"}><FiXCircle /> Cancel update</button>
                            <button onClick={submit} id={"save"}><FiSave /> Update</button>
                        </div>
                          
                    </form>
                </div>
        </Fragment>
    )
}

export default UpdateArticle