import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0,10)
    const [products, setProducts] = useState(first10)

    const [cart, setCart] = useState([]);//usestate 0 dile hobe na because aikhane khali cart er sonkha thakbe na but product gulo  o thakbe
    
    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);//object theke key ber kortesi
        const previousCart = productKeys.map(existingKey => { //uporer line er key gulo dorei ak akta product ase seigulo amra ber kore niye asbo
            const product = fakeData.find( pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            console.log(existingKey, savedCart[existingKey]);
            return product;
        })
        console.log(previousCart);

    }, [])
    const handleAddProduct = (product) =>{
        //console.log("product added" ,product);
        const toBeAddedkey = product.key;
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if(sameProduct){
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter (pd => pd.key !== toBeAddedkey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity= 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count)
        //key ={pd.key}  to avoid warning in console
    }

    return (
        <div className= "twin-container">
            <div className="product-container">
                {
                    products.map(pd => <Product
                        key ={pd.key} 
                        showAddToCart = {true}
                        handleAddProduct = {handleAddProduct}
                        product={pd}
                        ></Product>)
                }  
            </div>
            <div className="cart-container">
                <Cart cart ={cart}> {/*link k Cart component er child hisebe set korsi */}
                    <Link to ="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
            
            
        </div>
    );
};

export default Shop;