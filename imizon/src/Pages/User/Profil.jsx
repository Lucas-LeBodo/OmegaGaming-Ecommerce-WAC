// import libs
import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useHistory, useLocation} from 'react-router-dom';
import { RiDeleteBin5Line } from 'react-icons/ri'
import {Container} from 'react-bootstrap';


import ProfilNav from '../../Components/ProfilNav';
import UpdateProfil from '../../Components/UpdateProfil';
import Adress from '../../Components/Adress';
import PaymentInformation from '../../Components/PaymentInformation';
import HistoricOrder from '../../Components/Historic';

const Profil = () => {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [AdressData, setAdressData] = useState([]);
    const [historic, setHistoric] = useState([]);
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
                            <div className={'adress-table-body'} key={"divbody" + element.id}>
                                <div className={'adress-table-element'} key={"divelement" + element.id}>
                                    <div className={'adress-element'} key={"Adress" + element.id}>{element.adress} </div>
                                    <div className={'adress-element'} key={"Town" + element.id}>{element.town} </div>
                                    <div className={'adress-element'} key={"Zip" + element.id}>{element.zip} </div>  
                                    <div className={'adress-element'} key={"Country" + element.id}>{element.country} </div> 
                                    <div className={'adress-delete-box'} key={"deletebox" + element.id}>
                                        <div className={'adress-delete'} key={"delete" + element.id}><button id={"remove"} onClick={() => deleteAdress(element.id)}><RiDeleteBin5Line /></button></div> 
                                    </div>
                                </div>
                            </div>
                        )
                    });
                    setAdressData(showAdress);
                }
            }).catch((error) => {
                console.log(error)
            })
        }

        function getHistoric() {
            axios.get('https://localhost:8000/api/order_manifests?page=1&userId='+id, {
            }).then((response) => {
                if(response.data["hydra:member"].length > 0) {
                    let showHistoric = [];
                    let data = response.data["hydra:member"];
                    data.forEach(element => {
                        showHistoric.push(
                            <Link to={"/historic/"+element.orderId} key={element.orderId}>{element.orderId}</Link>
                        )
                    });
                    setHistoric(showHistoric);
                }
            }).catch((error) => {
                console.log(error)
            })
        }

        check();
        getAdresses();
        getHistoric();
    }, [history])

    const deleteAdress = (id) => {
        axios.delete('https://localhost:8000/api/adresses/'+id,{
        }
        ).then((response) => {
            console.log(response)
            window.location.reload()
        }).catch((error) => {
            console.log(error)
        })
    }

    
    let pathname = useLocation().pathname;
    let user = '';
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
        Historic = <HistoricOrder showHistoric={historic} />
    }
    if(pathname.endsWith("payment")){
        PaymentInfo = <PaymentInformation id={id} />
    }

    return (
        <Fragment>
            <ProfilNav />
            <Container>
                    <Link to={"/home"}>← back to home</Link>
            </Container>
            <div className="Settings-container">
                {UpdateUser}
                {Adresse}
                {Historic}
                {PaymentInfo}
                {user}
            </div>
        </Fragment>
    )
}

export default Profil;