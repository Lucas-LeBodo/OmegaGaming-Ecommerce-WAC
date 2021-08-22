const FormOrder = (allData) => {
    let data;
    if(allData.co === 'co'){
        data = JSON.stringify({
            "to_address": {
                "name": allData.lastName + " " + allData.firstName,
                "company": "Aucune",
                "street1": allData.adress,
                "street2": "",
                "city": allData.town, 
                "state": "Département de Paris",
                "zip": String(allData.zip),
                "country": allData.country,
                "phone": "5551231234",
                "email": allData.email
            },
            "from_address": {
                "name": "Pou Tine",
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
                    "weight": allData.weight
                }
            ],
            "TotalValue": allData.totalPriceBasket + " EUR",
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
                "street1": allData.adress,
                "street2": "",
                "city": allData.town,
                "state": "Département de Paris",
                "zip": String(allData.zip),
                "country": allData.country,
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
                    "weight": allData.weight
                }
            ],
            "TotalValue":  allData.totalPriceBasket + " EUR",
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
