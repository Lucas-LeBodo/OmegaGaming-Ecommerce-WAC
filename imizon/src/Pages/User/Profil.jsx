// import libs
import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory, useLocation} from 'react-router-dom';

import ProfilNav from '../../Components/ProfilNav';
import UpdateProfil from '../../Components/UpdateProfil';
import Adress from '../../Components/Adress';
import PaymentInformation from '../../Components/PaymentInformation';

const Profil = () => {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const history = useHistory();

    let pathname = useLocation().pathname;
    
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

    if(pathname.endsWith("update_information")) {
        return (
            <Fragment>
                <ProfilNav />
                <UpdateProfil
                    id={id}
                    email={email}
                    password={password}
                    firstName={firstName}
                    lastName={lastName}
                />
            </Fragment>
        )
    } 
    else if(pathname.endsWith("adresses")) {
        return (
            <Fragment>
                <ProfilNav />
                <Adress
                    id={id}
                />
            </Fragment>
        )
    }
    else if(pathname.endsWith("historic")) {
        return (
            <Fragment>
                <ProfilNav />
                <Adress
                    id={id}
                />
            </Fragment>
        )
    }
    else if(pathname.endsWith("payment")) {
        return (
            <Fragment>
                <ProfilNav />
                <PaymentInformation
                    id={id}
                />
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <ProfilNav />
            </Fragment>
        )
    }
}

export default Profil;