// Import Libs
import axios from 'axios';
import React, { Fragment, useEffect, useState }from 'react'
import { FiSave, FiXCircle} from 'react-icons/fi';

const UpdateCategory = (props) => {
    const [category, setCategory] = useState('')
    const [newCategory, setNewCategory] = useState('')

    let id = props.match.params.id
    useEffect(() => {
        function getInformations() {
            axios.get('https://localhost:8000/api/categories/'+id, {
            }).then((response) => {
                setCategory(response.data)
            }).catch((error) => {
                console.log(error)
            })
        }
        getInformations()
    }, [id])

    const submit = (event) => {
        event.preventDefault();
        axios.put('https://localhost:8000/api/categories/'+id,{
            categoryName: newCategory
        }).then((response) => {
            window.location.reload()
        }).catch((error) => {
            console.log(error);
        })
    }

    const cancelUpdate = (event) => {
        event.preventDefault();
        window.location.reload()
    }

    return(
        <Fragment>
            <div className="container-form">
                <div className="container-card">
                    <form>
                    <label>Category name : <input type="text" defaultValue={category.categoryName} placeholder={"Enter a category name"} onChange={(event)=>setNewCategory(event.target.value)} ></input></label>   
                        <div className="btn">
                            <button onClick={cancelUpdate} id={"cancel"}><FiXCircle /> Cancel update</button>
                            <button onClick={submit} id={"save"}><FiSave /> Update</button>
                        </div>
                    </form> 
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateCategory;