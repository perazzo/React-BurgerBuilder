import React, { Component } from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render () {
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            );
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the follwing ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><striong>Total Price: {this.props.price.toFixed(2)}</striong></p>
                <p>Continue to Checkout?</p>
                <Button buttonType="Danger" clicked={this.props.purchaseCancel} >CANCEL</Button>
                <Button buttonType="Success" clicked={this.props.purchaseContinue} >CONTINUE</Button>
            </Aux>
        );
    }
};

export default OrderSummary;