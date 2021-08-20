// import libs
import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';

const PaymentInformation = (props) => {

    const id = props.id
    const [exist, setExist] = useState(false);
    const [cardData, setCardData] = useState('');
    const [cvv, setCvv] = useState('');
    const [date, setDate] = useState('');
    const [idPayment, setIdPayment] = useState('');

    useEffect(() => {
        axios.get('https://localhost:8000/api/payments?page=1&idUser='+id,{
        }
        ).then((response) => {
            if(response.data["hydra:member"].length > 0) {
                let data = response.data["hydra:member"];
                data = data[0]
                setCardData(data.cardData)
                setCvv(data.cvv)
                setDate(data.date)
                setExist(true)
                setIdPayment(data.id)
            }
        }).catch((error) => {
        })
    }, [props])

    const submit = () => {
        let idUser = '\/api\/users\/'+id

        if(exist === true && idPayment !== '') {
            axios.put('https://localhost:8000/api/payments/'+idPayment,{
                cardData : cardData,
                cvv : parseInt(cvv),
                date: date,
                idUser: idUser
            }
            ).then((response) => {
            }).catch((error) => {
            })
        } else {
            axios.post('https://localhost:8000/api/payments',{
                cardData : cardData,
                cvv : parseInt(cvv),
                date: date,
                idUser: idUser
            }
            ).then((response) => {
            }).catch((error) => {
            })
        }
    }

    return (
        <Fragment>
            <div className={"containers-form"}>
                <div className={"containers-profil"}>
                    <h2>Update your's payment informations</h2>
                    <input type="text" className="profil-input"   defaultValue={cardData} placeholder={"Card Data"} onChange={ (event)=>{ setCardData(event.target.value)}} required/>
                    <input type="number" className="profil-input" defaultValue={cvv} placeholder={"CVV"} onChange={ (event)=>{ setCvv(event.target.value)}} max="3" required/>
                    <input type="text" className="profil-input"   defaultValue={date} placeholder={"Date"} onChange={ (event)=>{ setDate(event.target.value)}} required/>
                    <div type="submit" className="profil-btn" onClick={ submit } >Update Information</div>
                </div>
            </div>        
        </Fragment>
    )
}

export default PaymentInformation;