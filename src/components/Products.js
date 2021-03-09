import React, { Component } from 'react'
import formateCurrency from '../util'

export default class Products extends Component {
    render() {
        return (
            <div>
                <ul className="products">
                    {this.props.products.map((product) => (
                        <li key={product._id}>
                            <div className="product">
                                <a href={'#'+product._id}>
                                    <img src={product.image} alt={product.title}></img>
                                <p>{product.title}</p>
                                </a>
                                <div className="product-text">
                                    <div>{formateCurrency(product.prize)}</div>
                                    <button 
                                    className="button primary" 
                                    onClick={() => this.props.addToCart(product)} 
                                    > Add to Cart</button>
                                </div>
                            </div>
                        </li>
                    )
                    )}
                </ul>
            </div>
        )
    }
}
