import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchDinosaurs} from '../store/dinosaurReducer';

class HomePage extends Component {
    componentDidMount = () => {
        this.props.fetchDinosaurs
    };

    render(){
        return (
            <div>
                HELLO THIS IS WORKING
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
