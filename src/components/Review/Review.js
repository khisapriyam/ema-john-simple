import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';

const Review = () => {
    const[cart, setCart] = useState([])//use state use korle destructure ta [] er moddhe hobe
    const removeProduct = (productKey) => {
        //console.log("remove clicked",productKey);
        const newCart = cart.filter(pd =>pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=> {
        //cart er data rakbo useeffect er moddhe
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)//Object diye call korle key gulo dibe

        const cartProducts =productKeys.map( key => {
            const product = fakeData.find(pd => pd.key === key);//fakeData theke find kore key er jonno product ta ake niye asbo
            product.quantity = savedCart[key];
            return product
        });
        //console.log(cartProducts);
        setCart(cartProducts)
    }, [])
    return (
        <div className="twin-container">
            <div className ="product-container">
                {
                    cart.map(pd => <ReviewItem 
                        key = { pd.key}
                        removeProduct = {removeProduct}
                        product={pd}></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart = {cart}></Cart>{/*review.js theke cart pass kortesi cart.js a */}

            </div>
        </div>
    );
};

export default Review;