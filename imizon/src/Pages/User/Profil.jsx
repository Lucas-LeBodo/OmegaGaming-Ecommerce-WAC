// import libs
import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';


const Profil = () => {
    //Remplacer l'input pays par un select avec une liste full pays !

    const [phone, setPhone] = useState('');
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [adress, setAdress] = useState('');
    const [town, setTown] = useState('');
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
                    let {email, firstName, lastName, country, adress, cardData, id, password, postalCode, town, phone} = response.data
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
                    if(town !== null) {
                        setTown(town)
                    }
                    if(phone !== null) {
                        setPhone(phone)
                    }
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
        if(country === "") {
            setCountry("FR")
        }
        axios.put('http://localhost:8000/api/users/'+id,{
                email : email,
                password : password,
                lastName : lastName, 
                firstName : firstName,
                country : country,
                adress : adress,
                cardData : cardData,
                postalCode: postalCode,
                phone: parseInt(phone),
                town: town
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
                    <select className="form-select" aria-label="Default select example" onChange={ (event)=>{ setCountry(event.target.value)}}>
                        <option value="DE">Allemagne</option>
                        <option value="GB">Angleterre</option>
                        <option value="BE">Belgique</option>
                        <option value="CA">Canada</option>
                        <option value="ES">Espagne</option>
                        <option value="FR">France</option>
                        <option value="IT">Italie</option>
                        <option value="PT">Potugal</option>
                        <option value="CH">Suisse</option>
                    </select>
                    <input type="text"      className="signup-form"     defaultValue={town} placeholder={"Town"} onChange={ (event)=>{ setTown(event.target.value)}} required/>
                    <input type="text"      className="signup-form"     defaultValue={postalCode} placeholder={"Postal Code"} onChange={ (event)=>{ setPostalCode(event.target.value)}} required/>
                    <input type="text"      className="signup-form"     defaultValue={adress} placeholder={"Adress"} onChange={ (event)=>{ setAdress(event.target.value)}} required/>
                    <input type="text"      className="signup-form"     defaultValue={cardData} placeholder={"Card Data"} onChange={ (event)=>{ setCardData(event.target.value)}} required/>
                    <input type="number"    className="signup-form"     defaultValue={phone} placeholder={"Phone Number"} onChange={ (event)=>{ setPhone(event.target.value)}} required/>
                    <div type="submit"      className="signup-btn" onClick={ submit } >Update Information</div>
                </div>
            </div>        
        </Fragment>
    )
}

export default Profil