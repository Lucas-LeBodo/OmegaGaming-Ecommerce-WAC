// import libs
import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory, Link} from 'react-router-dom';


const Profil = () => {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const history = useHistory();
    
    useEffect(() => {
        // test avec un jwt vide pour voir !
        function check() 
        {
            if(localStorage.jwt){
                const base64Url = localStorage.jwt.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                let username = JSON.parse(window.atob(base64)).username;
                
                axios.get('https://localhost:8000/api/me', {
                    params: {username: username}
                }).then((response) => {
                    console.log(response.data)
                    let {email, firstName, lastName, id, password} = response.data
                    setId(id)
                    setPassword(password)
                    setEmail(email)
                    setFirstName(firstName)
                    setLastName(lastName)
                }).catch((error) => {
                    console.log(error)
                })
            } else {
                history.push("/login")
            }
        }
        check();
    }, [history])

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
            <div className="Panel">
                <div className="UserPanel-content">
                    <h4> User Settings </h4>
                    <div className="UserPanel-Link">
                        <Link to={'#'} >Account Information</Link>
                    </div>
                    <div className="darkline"></div>
                    <div className="UserPanel-Link">
                        <Link to={'#'} >Payment Information</Link>
                    </div>
                    <div className="darkline"></div>
                    <div className="UserPanel-Link">
                        <Link to={'#'} >Addresses</Link>
                    </div>
                    <div className="darkline"></div>
                    <div className="UserPanel-Link">
                        <Link to={'#'} >History</Link>
                    </div>
                </div>
            </div>

            <div className={"containers-form"} style={{background: "blue"}}>
                <div className={"containers-signup"}>
                    <h3>Update your's informations</h3>
                    <input type="email"     className="signup-form"     defaultValue={email} placeholder={"Email"} onChange={ (event)=>{ setEmail(event.target.value)}} required/>
                    <input type="password"  className="signup-form"     defaultValue={password} placeholder={"Password"} onChange={ (event)=>{ setPassword(event.target.value)}} required/>
                    <input type="text"      className="signup-form"     defaultValue={firstName} placeholder={"First Name"} onChange={ (event)=>{ setFirstName(event.target.value)}} required/>
                    <input type="text"      className="signup-form"     defaultValue={lastName} placeholder={"Last Name"} onChange={ (event)=>{ setLastName(event.target.value)}} required/>
                    <div type="submit"      className="signup-btn" onClick={ submit } >Update Information</div>
                </div>
            </div>        
        </Fragment>
    )
}

export default Profil