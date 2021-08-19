// import libs
import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';


const PaymentInformation = () => {

    const [id, setId] = useState('');
    const [cardData, setCardData] = useState('');
    const [cvv, setCvv] = useState('');
    const [date, setDate] = useState('');

    const submit = () => {
        let idUser = '\/api\/users\/'+id

        axios.post('https://localhost:8000/api/payments',{
            cardData : cardData,
            cvv : parseInt(cvv),
            date: date,
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
            <div className={"containers-form"} style={{background: "blue"}}>
                <div className={"containers-signup"}>
                    <h3>Update your's informations</h3>
                    <input type="text" className="signup-form" placeholder={"Card Data"} onChange={ (event)=>{ setCardData(event.target.value)}} required/>
                    <input type="number" className="signup-form" placeholder={"CVV"} onChange={ (event)=>{ setCvv(event.target.value)}} required/>
                    <input type="text" className="signup-form" placeholder={"Date"} onChange={ (event)=>{ setDate(event.target.value)}} required/>
                    <div type="submit" className="signup-btn" onClick={ submit } >Update Information</div>
                </div>
            </div>        
        </Fragment>
    )
}

export default PaymentInformation;