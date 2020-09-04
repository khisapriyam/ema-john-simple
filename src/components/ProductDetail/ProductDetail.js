import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();//useParams k call kore productKey k khujtesi and same name match korte hobe
    const product = fakeData.find(pd => pd.key === productKey);//database theke data load kora laage taile use effect use korba. aikhane shortcut a fakaData use kora hoise
    console.log(product);

    return (
        <div>
            <h1>{productKey} Detail Coming Soon</h1>
            <Product showAddToCart={false} product={product}></Product>{/*ai jaigai amra jokhon shop er product a click korbo tokhon shop page a product er detail dekhabe. amra Shop.js theke props hisebe {product} k pathacchi */}
        </div>
    );
};

export default ProductDetail;