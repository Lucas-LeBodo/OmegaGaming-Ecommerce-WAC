// import libs
import React, {Fragment, useState} from 'react';
import axios from 'axios';


const Adress = (props) => {

    const id = props.id
    const [country, setCountry] = useState('');
    const [adress, setAdress] = useState('');
    const [town, setTown] = useState('');
    const [zip, setZip] = useState('');
    const AdressData = props.showAdress;

    const submit = () => {
        if(country === "") {
            setCountry("FR")
        }
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
        }).catch((error) => {
            console.log(error)
        })
    }


    return (
        <Fragment>
            {AdressData}
            <div className={"containers-form"} style={{background: "blue"}}>
                <div className={"containers-signup"}>
                    <h3>Update your's informations</h3>
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
                    <div type="submit" className="signup-btn" onClick={ submit } >Update Information</div>
                </div>
            </div>        
        </Fragment>
    )
}

export default Adress