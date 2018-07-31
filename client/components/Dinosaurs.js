import React from 'react'
require('../../public/style.css')

const Dinosaurs = (props) => {
    return (
        <div className="dinosaur">
            <img src={props.data.imageUrl} className="mainPagePicture"/>
            <h1>{props.data.name}</h1>
            <h2>{(props.data.price/ 100).toLocaleString(
            'en-US',
            {style: 'currency', currency: 'USD'}
            )}</h2>
            <h4>{props.data.description}</h4> 
        </div>
    )
}

export default Dinosaurs
