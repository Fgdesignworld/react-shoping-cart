import React, { Component } from 'react'

export default class Filters extends Component {
    render() {
        return (
            <div className="filter">
                <div className="filter-result">{this.props.count} Products</div>
                <div className="filter-sort">Order{"   "}
                    <select value={this.props.sort} onChange={this.props.sortProducts}>
                        <option>Latest</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>
                    </select> </div>
                <div className="filter-size">Size{"    "}
                    <select value={this.props.size} onChange={this.props.filterProducts}>
                        <option value="">All</option>
                        <option value="XXL">XXL</option>
                        <option value="s">s</option>
                        <option value="m">m</option>
                        <option value="l">l</option>
                    </select>
                </div>
                
            </div>
        )
    }
}
