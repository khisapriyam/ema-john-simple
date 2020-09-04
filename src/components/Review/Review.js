import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const[cart, setCart] = useState([])//use state use korle destructure ta [] er moddhe hobe
    const [orderPlaced, setOrderPlaced] = useState(false)//by default ordr place kore nai tai false

    const handlePlaceOrder = () =>{//jehetu arma button ta child hisebe use kortesi tai direct aikhane declare korleo hobe
        //console.log('order placed');
        setCart([]); //setCart use kortesi karon cart taake empty kore diba jokhon order place korbe
        setOrderPlaced(true);//order place hole state ta update hoye true hobe
        processOrder();//ai function ta order place korle cart er item gulo clear kore dibe and ai ta data base k clean korbe.process order ta holo database
        
    }

    const removeProduct = (productKey) => {
        //console.log("remove clicked",productKey);
        const newCart = cart.filter(pd =>pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=> {
        //cart er data rakbo useeffect er moddhe//use effct diya data ta ke load kortesi get database cart theke
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)//Object diye call korle key gulo dibe

        const cartProducts =productKeys.map( key => {
            const product = fakeData.find(pd => pd.key === key);//fakeData theke find kore key er jonno product ta ake niye asbo
            product.quantity = savedCart[key];
            return product
        });
        //console.log(cartProducts);
        setCart(cartProducts)
    }, []);

    let thankyou;
    if(orderPlaced){
        thankyou = <img src= {happyImage} alt=""/>//thankyou ta output a tokhon dekhabo jokhon orderPlace ta true hobe
    }
    return (
        <div className="twin-container">
            <div className ="product-container">
                {
                    cart.map(pd => <ReviewItem 
                        key = { pd.key}
                        removeProduct = {removeProduct}
                        product={pd}></ReviewItem>)
                }
                {
                    thankyou
                }
               
            </div>
            <div className="cart-container">
                <Cart cart = {cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Place Order</button>{/**kono parameter pass kora lagtesena tai sorasori disi,naile arrow function use korte hoto */}
                    
                </Cart>{/*review.js theke cart pass kortesi cart.js a */}

            </div>
        </div>
    );
};

export default Review;