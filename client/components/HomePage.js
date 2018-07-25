import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchDinosaurs} from '../store/dinosaurReducer';
const fakeData = [{id: 1, name:'t-rex', price: 5, description: 'this is a description', image: 'https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/MonolophosaurusHiRes_usl6ti.jpg'}, {id: 2, name:'raptor', price: 5, description: 'this is a description', image: 'https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/MonolophosaurusHiRes_usl6ti.jpg'}]

class HomePage extends Component {
    componentDidMount = () => {
        this.props.fetchDinosaurs
    };

    render(){
        return (
            <div>
                {
                    fakeData.map((data) => {
                        return (
                            <ul key={data.id}>
                                <h1>{data.name}</h1>
                                <h1>{data.price}</h1>
                                <h1>{data.description}</h1>
                                <h1>{data.image}</h1>
                                <button>Add To Cart</button>
                            </ul>
                        )
                    })
                }
            </div>
        )
    }

};

const mapStateToProps = (state) => ({
    dinosaurs: state.dinosaurs
});

const mapDispatchToProps = dispatch => ({
    fetchDinosaurs: () => dispatch(fetchDinosaurs())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
