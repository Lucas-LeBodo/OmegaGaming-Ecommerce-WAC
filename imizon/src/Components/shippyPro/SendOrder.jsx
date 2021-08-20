import axios from 'axios';

const SendOrder = (data, idUser, totalPrice, basket) => {
        
    axios.get('https://localhost:8000/api/shippy/postOrder?params=' + data,{  
    }).then((response) => {
        let order = JSON.parse(response.data)
        if(order.Result == "OK"){
            let NbOrder = order.NewOrderID
            sendToOrderManifest(idUser, NbOrder, totalPrice, basket)
        }
    }).catch((error) => {
        
    })

    const sendToOrderManifest = (idUser, NbOrder, totalPrice, basket) => {
        axios.post('https://localhost:8000/api/order_manifests', { 
            orderId : parseInt(NbOrder),
            content : JSON.stringify(basket),
            userId : parseInt(idUser),
            price : parseInt(totalPrice)
        }).then((response) => {
            deleteBasket(idUser, NbOrder, basket)
        }).catch((error) => {
            
        })
    }
    
    /**
     *  fonction de reinitialisation du basket 
     * 
     *  on peut transmettre  des donne via state: { nbOrder: NbOrder }
     *  
     * @param {*} idUser
     */
    
    const deleteBasket = (idUser, NbOrder, basket) => {
        localStorage.removeItem('shoppingUserNoLog')
        axios.get('https://localhost:8000/api/shippy/deleteBasket?params='+ idUser, { 
        }).then((response) => {     
                substractStock(NbOrder, basket)
        }).catch((error) => {
            
        })
    }

    const substractStock = (NbOrder, basket) => {
        
        basket.forEach((element) => {
            let newStock = (element.Stock - 1);
            axios.patch('https://localhost:8000/api/articles/'+ element.id, { 
                Title: element.Title,
                Description: element.Description,
                Image: element.Image,
                Feature: element.Feature,
                Price: element.Price,
                Stock: newStock,
                sameArticles:  element.sameArticles,
                weight: element.weight,
                discount: element.discount
            }).then((response) => {  
                window.location.href='/historic/'+NbOrder
            }).catch((error) => {  
            })
        })  
    }


}
export default SendOrder