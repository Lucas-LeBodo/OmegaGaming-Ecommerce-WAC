import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SendOrder = (data, idUser, totalPrice, basket) => {

        
    axios.get('http://localhost:8000/api/shippy/postOrder?params=' + data,{  
    }).then((response) => {
        let order = JSON.parse(response.data)
        if(order.Result == "OK"){
            let NbOrder = order.NewOrderID
            sendToOrderManifest(idUser, NbOrder, totalPrice, basket)
        }
    }).catch((error) => {
        
    })
    const sendToOrderManifest = (idUser, NbOrder, totalPrice, basket) => {
        axios.post('http://localhost:8000/api/order_manifests', { 
            orderId : parseInt(NbOrder),
            content : JSON.stringify(basket),
            userId : parseInt(idUser),
            price : parseInt(totalPrice)
        }).then((response) => {
            if(response.statusText == "Created"){
                console.log('le')
                deleteBasket(idUser, NbOrder, basket)
            }
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
        axios.get('http://localhost:8000/api/shippy/deleteBasket?params='+ idUser, { 
        }).then((response) => {     
            if(response.statusText == "OK"){
                substractStock(NbOrder, basket)
            }         
        }).catch((error) => {
            
        })
    }

    const substractStock = (NbOrder, basket) => {
        
        console.log("popopoo")
        console.log(basket)
        basket.forEach((element) => {
            let newStock = (element.Stock - 1);
            axios.patch('http://localhost:8000/api/articles/'+ element.id, { 
                Title: element.Title,
                Description: element.Description,
                Image: element.Image,
                Feature: element.Feature,
                Price: element.Price,
                Stock: newStock,
                //category:  element.category,
                sameArticles:  element.sameArticles,
                weight: element.weight,
                discount: element.discount
            }).then((response) => {  
                console.log('lo')
                if(response.statusText == "OK"){
                    window.location.href='/historic/'+NbOrder
                }else{
                    
                }        
            }).catch((error) => {  
            })
        })  
    }


}
export default SendOrder