import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Product from './components/Product/Product';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import Notfound from './components/NotFound/Notfound';
import ProductDetail from './components/ProductDetail/ProductDetail';



function App() {
  return (
    <div>
      <Header></Header>{/* header is outside so it will be accessed all time*/}
      <Router>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/inventory">
            <Inventory></Inventory>
          </Route>
          <Route exact path="/">{/*jodi kono link dewa na thake taile main j page ta ase ta diba. nahole load hole kisu dekhabe na */}
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">{/*: diye dynamic kortesi */}
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <Notfound></Notfound>

          </Route>

        </Switch>

      </Router>
     
      
      
      
    </div>
  );
}

export default App;
