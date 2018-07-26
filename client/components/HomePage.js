import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchDinosaurs} from '../store/dinosaurReducer';
import {addToCart} from '../store/cartReducer';
const fakeData = [{id: 1, name:'t-rex', price: 5, description: 'this is a description', image: 'https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/MonolophosaurusHiRes_usl6ti.jpg'}, {id: 2, name:'raptor', price: 5, description: 'this is a description', image: 'https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/MonolophosaurusHiRes_usl6ti.jpg'}]

export class HomePage extends Component {
	constructor() {
		super()
		this.handleClick = this.handleClick.bind(this)
	}

    componentDidMount() {
        this.props.fetchDinosaurs()
    };

    handleClick (dinosaur) {
    	this.props.addToCart(dinosaur)
    }

    render(){
        return (
            <div>
                {
                    fakeData.map((data) => {
                        return (
                            <ul key={data.id}>
                                <h2>{data.name}</h2>
                                <h1>{data.price}</h1>
                                <h1>{data.description}</h1>
                                <h1>{data.image}</h1>
                                <button onClick={() => {this.handleClick(data)}}>Add To Cart</button>
                            </ul>
                        )
                    })
                }
            </div>
        )
    }

};

const mapStateToProps = (state) => ({
    dinosaurs: state.dinosaurs,
    cart: state.cart
});

const mapDispatchToProps = dispatch => ({
    fetchDinosaurs: () => dispatch(fetchDinosaurs()),
    addToCart: (dinosaur) => dispatch(addToCart(dinosaur)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
