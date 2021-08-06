// import libs
import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';



const Profil = () => {
    //Remplacer l'input pays par un select avec une liste full pays !

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [adress, setAdress] = useState('');
    const [cardData, setCardData] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const history = useHistory();


    useEffect(() => {
        // test avec un jwt vide pour voir !
        function check() 
        {
            if(localStorage.jwt){
                const base64Url = localStorage.jwt.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                let username = JSON.parse(window.atob(base64)).username;
                
                axios.get('http://localhost:8000/api/me', {
                    params: {username: username}
                }).then((response) => {
                    console.log(response.data)
                    let {email, firstName, lastName, country, adress, cardData, id, password, postalCode} = response.data
                    setId(id)
                    setPassword(password)
                    setEmail(email)
                    setFirstName(firstName)
                    setLastName(lastName)
                    if(country !== null) {
                        setCountry(country)
                    }
                    if(adress !== null) {
                        setAdress(adress)
                    }
                    if(cardData !== null) {
                        setCardData(cardData)
                    }
                    if(postalCode !== null) {
                        setPostalCode(postalCode)
                    }
                }).catch((error) => {
                    console.log(error)
                })
            } else {
                history.push("/login")
            }
        }
        check();
    }, [])

    const submit = () => {
        axios.put('http://localhost:8000/api/users/'+id,{
                email : email,
                password : password,
                lastName : lastName, 
                firstName : firstName,
                country : country,
                adress : adress,
                cardData : cardData,
                postalCode: postalCode,
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
                    <input type="email" className="signup-form"    defaultValue={email} placeholder={"Email"} onChange={ (event)=>{ setEmail(event.target.value)}} required/>
                    <input type="password" className="signup-form" defaultValue={password} placeholder={"Password"} onChange={ (event)=>{ setPassword(event.target.value)}} required/>
                    <input type="text" className="signup-form"     defaultValue={firstName} placeholder={"First Name"} onChange={ (event)=>{ setFirstName(event.target.value)}} required/>
                    <input type="text" className="signup-form"     defaultValue={lastName} placeholder={"Last Name"} onChange={ (event)=>{ setLastName(event.target.value)}} required/>
                    <input type="text" className="signup-form"     defaultValue={country} placeholder={"Country"} onChange={ (event)=>{ setCountry(event.target.value)}} required/>
                    <input type="text" className="signup-form"     defaultValue={adress} placeholder={"Adress"} onChange={ (event)=>{ setAdress(event.target.value)}} required/>
                    <input type="text" className="signup-form"     defaultValue={postalCode} placeholder={"Adress"} onChange={ (event)=>{ setPostalCode(event.target.value)}} required/>
                    <input type="text" className="signup-form"     defaultValue={cardData} placeholder={"Card Data"} onChange={ (event)=>{ setCardData(event.target.value)}} required/>
                    <div type="submit" className="signup-btn" onClick={ submit } >Sign In</div>
                </div>
            </div>        
        </Fragment>
    )
}

export default Profil