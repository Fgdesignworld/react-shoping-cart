import React, { Component } from 'react'
import formateCurrency from '../util';

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            eamil: "",
            phone: "",
            showCheckOut: false
        };
    }
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value}) ;
    }

    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name : this.state.name,
            eamil : this.state.eamil,
            phone : this.state.phone,
            cartItems : this.props.cartItems,
        };
        this.props.createOrder(order);
    }

    render() {
        const {cartItems} = this.props ;
        return (
            // const cartItems = {this.props.cartItems}
            <div>
                 <div>
               {cartItems.length === 0 ? (
                   <div className="cart cart-header">the cart is empty</div>
               ):(
                   <div className="cart cart-header">itme in {cartItems.length} cart</div>
               )}
            </div>

            <div className="cart">
                <ul className="cart-item">
                    {cartItems.map(item => (
                        <li key={item._id}>
                            <div><img src={item.image} alt={item.title}></img></div>
                            <div>
                            <div>{item.title}</div>
                            <div className="right">
                            {formateCurrency(item.prize)} x {item.count}
                            <button onClick={() =>{this.props.removeFromCart(item)}} className="button">Remove</button>
                            </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
            {cartItems.length !== 0 && (
                            <div className="cart">
                            <div className="total">
                            <div>
                                 Total: 
                                 {formateCurrency(cartItems.reduce((a,c) => a + c.prize * c.count, 0))}
                             </div>
                             <button onClick={() => {this.setState({showCheckOut: true})}} className="button primary">Proceed</button>
                            </div>
                         </div>
            )}
            </div>
            <div>
                {this.state.showCheckOut && (
                    <div className="cart">
                        <form onSubmit={this.createOrder}>
                            <ul className="form-Container">
                                <li>
                                    <label>Email</label>
                                    <input type="email" name="email" required onChange={this.handleInput}></input>
                                </li>
                                <li>
                                    <label>Name</label>
                                    <input type="text" name="name" required onChange={this.handleInput}></input>
                                </li>
                                <li>
                                    <label>Phone</label>
                                    <input type="text" name="phone" required onChange={this.handleInput}></input>
                                </li>
                                <li><button type="submit" className="button primary">Check Out</button></li>
                            </ul>
                            
                        </form>
                    </div>
                )}
            </div>

            </div>
        )
    }
}
