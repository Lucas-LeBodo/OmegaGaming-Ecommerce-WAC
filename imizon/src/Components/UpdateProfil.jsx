// import libs
import React, {Fragment, useState} from 'react';
import axios from 'axios';


const UpdateProfil = (props) => {

    const id = props.id;
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState(props.password);
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);

    const submit = () => {
        axios.put('https://localhost:8000/api/users/'+id,{
                email : email,
                password : password,
                lastName : lastName, 
                firstName : firstName,
            }
            ).then((response) => {
            }).catch((error) => {
            })
    }

    return (
        <Fragment>
            <div className={"containers-form"}>
                <div className={"containers-profil"}>
                    <h2>Update your's informations</h2>
                    <input type="text"      className="profil-input"     defaultValue={firstName} placeholder={"First Name"} onChange={ (event)=>{ setFirstName(event.target.value)}} required/>
                    <input type="text"      className="profil-input"     defaultValue={lastName} placeholder={"Last Name"} onChange={ (event)=>{ setLastName(event.target.value)}} required/>
                    <input type="email"     className="profil-input"     defaultValue={email} placeholder={"Email"} onChange={ (event)=>{ setEmail(event.target.value)}} required/>
                    <input type="password"  className="profil-input"     defaultValue={password} placeholder={"Password"} onChange={ (event)=>{ setPassword(event.target.value)}} required/>
                    <div type="submit"      className="profil-btn" onClick={ submit } >Save change</div>
                </div>
            </div>        
        </Fragment>
    )
}

export default UpdateProfil