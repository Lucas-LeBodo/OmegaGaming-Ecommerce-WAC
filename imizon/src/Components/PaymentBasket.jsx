import React, { Fragment } from 'react';

import FormOrder from './shippyPro/FormOrder';
import SendOrder from './shippyPro/SendOrder';

const PaymentBasket = (warning, sendData) => {
    let view = '';

    const submit = () => {
        if(sendData.co === "co") {
            let dataShippy = FormOrder(sendData)
            if(dataShippy != ""){
                SendOrder(dataShippy, sendData.id, sendData, sendData.allArticles)
            }
        } else {
            let dataShippy = FormOrder(sendData)
            if(dataShippy != ""){
                SendOrder(dataShippy, sendData.id, sendData, sendData.basketNotCo)
            }
        }
    }

    if(warning === "warning") {
        view = (
        <Fragment>
            <div className={"containers-form"}>
                <div className={"containers-profil"}>
                    <h2>Update your's payment informations</h2>
                    <input type="text" className="profil-input" placeholder={"Card Data"} required/>
                    <input type="number" className="profil-input" placeholder={"CVV"} max="3" required/>
                    <input type="text" className="profil-input" placeholder={"Date"} required/>
                    <div type="submit" className="profil-btn" onClick= {submit} >Update Information</div>
                <p style={{color:"red"}}>Bad cvv, please enter your informations</p>
                </div>
            </div>        
        </Fragment>
        )
    } else {
        view = (
            <Fragment>
                <div className={"containers-form"}>
                    <div className={"containers-profil"}>
                        <h2>Update your's payment informations</h2>
                        <input type="text" className="profil-input" placeholder={"Card Data"} required/>
                        <input type="number" className="profil-input" placeholder={"CVV"} max="3" required/>
                        <input type="text" className="profil-input" placeholder={"Date"} required/>
                        <div type="submit" className="profil-btn" onClick= {submit} >Update Information</div>
                    </div>
                </div>        
            </Fragment>
            )
    }
    return(view)
}

export default PaymentBasket;