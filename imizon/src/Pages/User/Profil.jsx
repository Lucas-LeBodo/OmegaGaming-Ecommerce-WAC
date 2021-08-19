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
    const [AdressData, setAdressData] = useState([]);
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

        function getAdresses() 
        {
            axios.get('https://localhost:8000/api/adresses?page=1&id_user='+id, {
            }).then((response) => {
                if(response.data["hydra:member"].length > 0) {
                    let showAdress = [];
                    let data = response.data["hydra:member"];
                    data.forEach(element => {
                        showAdress.push(
                            <div key={"div" + element.id}>
                                <p key={"Adress" + element.id}>Adress : {element.adress} </p>  
                                <p key={"Town" + element.id}>Town : {element.town} </p>  
                                <p key={"Zip" + element.id}>Zip : {element.zip} </p>  
                                <p key={"Country" + element.id}>Country : {element.country} </p>  
                            </div>
                        )
                    });
                    setAdressData(showAdress);
                }
            }).catch((error) => {
                console.log(error)
            })
        }

        check();
        getAdresses();
    }, [history])

    
    let pathname = useLocation().pathname;
    let UpdateUser = '';
    let Adresse = '';
    let Historic = '';
    let PaymentInfo = '';

    if(pathname.endsWith("update_information")){
        UpdateUser = <UpdateProfil id={id} email={email} password={password} firstName={firstName} lastName={lastName} />
    }
    if(pathname.endsWith("adresses")){
        Adresse = <Adress id={id} showAdress={AdressData}/>
    }
    if(pathname.endsWith("historic")){
        Historic =  <Adress id={id} />
    }
    if(pathname.endsWith("payment")){
        PaymentInfo = <PaymentInformation id={id} />
    }

    return (
        <Fragment>
            <ProfilNav />
            <div className="Settings-container">
                {UpdateUser}
                {Adresse}
                {Historic}
                {PaymentInfo}
            </div>
        </Fragment>
    )
}

export default Profil;