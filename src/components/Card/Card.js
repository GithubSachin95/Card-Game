import React from 'react';
import './Card.css';
import cardbg from '../../assets/card-bg.jpg';
const Card = (props) => {

    return (
        
            <div className="card col-3" onClick={()=>{props.handleCardClick(props.value, props.number);}}>
                 <img src={cardbg} /> 
                              
            </div>
        
    )
}

export default Card;
