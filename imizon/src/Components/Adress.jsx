// import libs
import React, {Fragment, useState} from 'react';
import axios from 'axios';


const Adress = (props) => {

    const id = props.id
    const [country, setCountry] = useState('DE');
    const [adress, setAdress] = useState('');
    const [town, setTown] = useState('');
    const [zip, setZip] = useState('');
    const AdressData = props.showAdress;

    const submit = () => {
        let idUser = '\/api\/users\/'+id

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
    if(AdressData.length > 0) {
        showTable = (
        <table className={'adress-table'}>
                <thead>
                    <tr>
                        <th>Adresse</th>
                        <th>Town</th>
                        <th>ZIP Code</th>
                        <th>Country</th>
                        <th>Delete</th>
                    </tr>
                </thead>      
                {AdressData}  
            </table>
        )
    }

    return (
        <Fragment>
            <div className={"containers-form"} style={{background: "blue"}}>
                <div className={"containers-signup"}>
                    <h3>Create an adress</h3>
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
                    <input type="text" className="signup-form" placeholder={"Town"} onChange={ (event)=>{ setTown(event.target.value)}} required/>
                    <input type="text" className="signup-form" placeholder={"Postal Code"} onChange={ (event)=>{ setZip(event.target.value)}} required/>
                    <input type="text" className="signup-form" placeholder={"Adress"} onChange={ (event)=>{ setAdress(event.target.value)}} required/>
                    <div type="submit" className="signup-btn" onClick={ submit } >Create</div>
                </div>
            </div>
            {showTable}
        </Fragment>
    )
}

export default Adress