// import libs
import React, {Fragment, useState} from 'react';
import axios from 'axios';

const Adress = (props) => {

    const id = props.id
    const [country, setCountry] = useState('DE');
    const [adress, setAdress] = useState('');
    const [town, setTown] = useState('');
    const [zip, setZip] = useState('');
    const adressData = props.showAdress;

    const submit = () => {
        let idUser = '/api/users/'+id

        axios.post('https://localhost:8000/api/adresses',{
            country : country,
            adress : adress,
            zip: parseInt(zip),
            town: town,
            idUser: idUser
        }
        ).then((response) => {
            console.log(response)
            window.location.reload()
        }).catch((error) => {
            console.log(error)
        })
    }

    let showTable = "";
    if(adressData.length > 0) {
        showTable = (
            <div className="adress-grid">
                <div className={'adress-table'}>
                    <div className={'adress-table-head'}>
                        <div className={'adress-table'}>Adresse</div>
                        <div className={'adress-table'}>Town</div>
                        <div className={'adress-table'}>ZIP Code</div>
                        <div className={'adress-table'}>Country</div>
                    </div>
                    {adressData}  
                </div>
            </div>
        )
    }

    return (
        <Fragment>
            <div className={"containers-form"}>
                <div className={"containers-profil"}>
                    <h2>Create an adress</h2>
                    <select className="profil-input" aria-label="Default select example" onChange={ (event)=>{ setCountry(event.target.value)}}>
                        <option value="DE">Allemagne</option>
                        <option value="GB">Angleterre</option>
                        <option value="BE">Belgique</option>
                        <option value="CA">Canada</option>
                        <option value="ES">Espagne</option>
                        <option value="FR">France</option>
                        <option value="IT">Italie</option>
                        <option value="PT">Portugal</option>
                        <option value="CH">Suisse</option>
                    </select>
                    <input type="text" className="profil-input" placeholder={"Town"} onChange={ (event)=>{ setTown(event.target.value)}} required/>
                    <input type="text" className="profil-input" placeholder={"Postal Code"} onChange={ (event)=>{ setZip(event.target.value)}} required/>
                    <input type="text" className="profil-input" placeholder={"Adress"} onChange={ (event)=>{ setAdress(event.target.value)}} required/>
                    <div type="submit" className="profil-btn" onClick={ submit } >Create</div>
                </div>
            </div>
            {showTable}
        </Fragment>
    )
}

export default Adress