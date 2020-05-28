import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandle from '../../hoc/withErrorHandle/withErrorhandle';
import * as action from '../../store/actions/index';

export class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing: false
        };
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    puchaseCancelHanlder = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // this is from the router
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    } 

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = <Spinner />
        if(this.props.ings) {
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancel={this.puchaseCancelHanlder}
                purchaseContinue={this.purchaseContinueHandler}
            />;
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        ingredientAdded={this.props.onIgredientAdded} 
                        ingredientRemoved={this.props.onIgredientRemoved}
                        ordered={this.purchaseHandler}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                    />
                </Aux>
            );
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.puchaseCancelHanlder}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIgredientAdded: (ingName) => dispatch(action.addIngredient(ingName)),
        onIgredientRemoved: (ingName) => dispatch(action.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(action.initIngredients()),
        onInitPurchase: () => dispatch(action.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandle(BurgerBuilder, axios));