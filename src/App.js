import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import { About, Auth, Cart, Checkout, Error, Home, PrivateRoute, Products, SingleProduct} from "./pages";

function App() {
  return (
    <Auth>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route path="/products/:id" children={<SingleProduct />}/>
          <PrivateRoute path="/checkout">
            <Checkout />
          </PrivateRoute>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </Auth>
  );
}

export default App
