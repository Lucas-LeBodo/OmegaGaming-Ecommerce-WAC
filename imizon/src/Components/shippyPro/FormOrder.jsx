import React, { useEffect } from "react";

const FormOrder = (weight, co, e, totalPriceBasket) => {
    let country = e.target[0];
    let address = e.target[1];
    let zip = e.target[2];
    let payment =  e.target[3];
    let firstname = e.target[4]
    let lastname = e.target[5]
    let email = e.target[6]
    let data;
    if(co == 'co'){
        data = JSON.stringify({
            "to_address": {
                "name": firstname.value + " " + lastname.value,
                "company": "ShippyPro",
                "street1": address.value,
                "street2": "",
                "city": "Paris", //add city
                "state": "Département de Paris",
                "zip": zip.value,
                "country": "FR",
                "phone": "5551231234",
                "email": email.value
            },
            "from_address": {
                "name": "Damien Legrand",
                "company": "Aucune",
                "street1": "Rue d'Avron 116",
                "street2": "",
                "city": "Paris",
                "state": "Département de Paris",
                "zip": "75020",
                "country": "FR",
                "phone": "+33 623525172",
                "email": "damienlg06@hotmail.com"
            },
            "parcels": [
                {
                    "length": 5,
                    "width": 5,
                    "height": 5,
                    "weight": weight
                }
            ],
            "TotalValue":  totalPriceBasket + " EUR",
            "TransactionID": "ORDER2365",
            "ContentDescription": "Multi_Articles",
            "Insurance": 0,
            "InsuranceCurrency": "EUR",
            "CashOnDelivery": 0,
            "CashOnDeliveryCurrency": "EUR",
            "CashOnDeliveryType": 0,
            "CarrierName": "Generic",
            "CarrierService": "Standard",
            "CarrierID": 2747,
            "OrderID": "",
            "RateID": "",
            "Incoterm": "DAP",
            "BillAccountNumber": "",
            "Note": "Ship by 06/08/2021",
            "Async": false
        })
    }else{
        data = JSON.stringify({
            "to_address": {
                "name": 'john',
                "company": "ShippyPro",
                "street1": "address",
                "street2": "",
                "city": "Paris", //add city
                "state": "Département de Paris",
                "zip": '44000',
                "country": "FR",
                "phone": "5551231234",
                "email":"john@doe"
            },
            "from_address": {
                "name": "Damien Legrand",
                "company": "Aucune",
                "street1": "Rue d'Avron 116",
                "street2": "",
                "city": "Paris",
                "state": "Département de Paris",
                "zip": "75020",
                "country": "FR",
                "phone": "+33 623525172",
                "email": "damienlg06@hotmail.com"
            },
            "parcels": [
                {
                    "length": 5,
                    "width": 5,
                    "height": 5,
                    "weight": weight
                }
            ],
            "TotalValue":  totalPriceBasket + " EUR",
            "TransactionID": "ORDER2365",
            "ContentDescription": "Multi_Articles",
            "Insurance": 0,
            "InsuranceCurrency": "EUR",
            "CashOnDelivery": 0,
            "CashOnDeliveryCurrency": "EUR",
            "CashOnDeliveryType": 0,
            "CarrierName": "Generic",
            "CarrierService": "Standard",
            "CarrierID": 2747,
            "OrderID": "",
            "RateID": "",
            "Incoterm": "DAP",
            "BillAccountNumber": "",
            "Note": "Ship by 06/08/2021",
            "Async": false
        })
    }
    return(data)
}
export default FormOrder
