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
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }


    return (
        <Fragment>
            <div className={"containers-form"} style={{background: "blue"}}>
                <div className={"containers-signup"}>
                    <h3>Update your's informations</h3>
                    <input type="email"     className="signup-form"     defaultValue={email} placeholder={"Email"} onChange={ (event)=>{ setEmail(event.target.value)}} required/>
                    <input type="password"  className="signup-form"     defaultValue={password} placeholder={"Password"} onChange={ (event)=>{ setPassword(event.target.value)}} required/>
                    <input type="text"      className="signup-form"     defaultValue={firstName} placeholder={"First Name"} onChange={ (event)=>{ setFirstName(event.target.value)}} required/>
                    <input type="text"      className="signup-form"     defaultValue={lastName} placeholder={"Last Name"} onChange={ (event)=>{ setLastName(event.target.value)}} required/>
                    <div type="submit"      className="signup-btn" onClick={ submit } >Save change</div>
                </div>
            </div>        
        </Fragment>
    )
}

export default UpdateProfil