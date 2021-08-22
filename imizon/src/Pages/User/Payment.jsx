import axios from 'axios';
import React, {Fragment, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';

//import functions
import FormOrder from '../../Components/shippyPro/FormOrder';
import SendOrder from '../../Components/shippyPro/SendOrder';
import PaymentView from '../../Components/PaymentBasket';

const Payment = (props) => {

    const [showForm, setShowForm] = useState('');
    const history = useHistory();
    
    useEffect(() => {
        if(props.history.location.state === undefined) {
            history.push("/basket")
        } else {
            let sendData = props.history.location.state.sendData;
            if(sendData.co === "co") {
                axios.get('https://localhost:8000/api/payments?page=1&idUser='+sendData.id, {
                }).then((response) => {
                    if(response.data["hydra:member"].length > 0) {
                        let dataPayment = response.data["hydra:member"][0];
                        let cvv = window.prompt("Would you paid with your cvv ?")
                        if(parseInt(cvv) === dataPayment.cvv){
                            let dataShippy = FormOrder(sendData)
                            if(dataShippy !== ""){
                                SendOrder(dataShippy, sendData.id, sendData, sendData.allArticles)
                            }
                        } else {
                            setShowForm(PaymentView("warning", sendData))
                        }
                    } else {
                        setShowForm(PaymentView("nope", sendData))
                    }
                }).catch((error) => {
                })
            } else {
                setShowForm(PaymentView("nope", sendData))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])
    
    return(
        <Fragment >
            {showForm}
        </Fragment>
    )
}

export default Payment;