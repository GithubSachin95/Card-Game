import React from 'react';
import Card from '../Card/Card';

class Stack extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (

            <div className="col-6">
                <h5>Stack {this.props.number}</h5>
                <h2>Score : {this.props.score}</h2>
                <div className="row">
                {this.props.cards.map((item) => {
                    return <Card number={this.props.number} value={item} handleCardClick={this.props.handleCardClick}/>
                })}
                </div>
            </div>

        )
    }
}

export default Stack;
