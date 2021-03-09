// features
import React from "react";
import Cart from "./components/Cart";
import Filters from "./components/Filters";
import Products from "./components/Products";
import data from "./data.json";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products : data.products,
      cartItems: localStorage.getItem("cartItems") ? (JSON.parse(localStorage.getItem("cartItems"))) : [],
      size : "",
      sort : ""
    }
  }
  
  createOrder = (order) => {
    alert("need to save order" + order.name);
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((x) => x._id !== product._id)));
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let allreadyInCart = false;
    cartItems.forEach((item) => {
      if(item._id === product._id){
        item.count++ ;
        allreadyInCart = true ;
      }
    });
    if(!allreadyInCart){
        cartItems.push({...product , count: 1});
    }
    this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  sortProducts = (event) => {
    const sort = event.target.value ;
    console.log(sort);
    this.setState(state =>({
      sort: sort,
      products: this.state.products
      .slice()
      .sort((a, b) => (
        sort === "lowest" 
        ? ((a.prize > b.prize) ? 1:-1):
        sort === "highest" ? ((a.prize < b.prize)? 1:-1):
         a._id > b._id ? 1: -1
      ))
    }));
  }
  filterProducts = (event) => {
    console.log(event.target.value);
    if(event.target.value === ""){
      this.setState({size: event.target.value, products: data.products})
    }else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availbleSizes.indexOf(event.target.value) >= 0)
      })
    }
  } 
  render(){
    return (
      <div className="grid-container">
      <header><a href="/">React Shoping cart</a></header>
      <main>
        <div className="content">
          <div className="main">
            <Filters 
              count={this.state.products.length}
              size = {this.state.size}
              sort ={this.state.sort}
              filterProducts = {this.filterProducts}
              sortProducts = {this.sortProducts}
            ></Filters>
            <Products 
            products={this.state.products} 
            addToCart={this.addToCart}></Products>
          </div>
          <div className="sidebar">
            <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder}></Cart>
          </div>
        </div>
      </main>
      <footer>All Copie Rights Recived</footer>
    </div>
    );
  }
}

export default App;
