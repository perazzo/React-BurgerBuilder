import React from 'react';

import BurgerIngredient from './BurgerIngredients/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {
    

    // Object.keys => keys of the objects converted to an array
    // map => creates a new array with the results of a provided/created function
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        })
        .reduce((arr, el) => {      // arr = accumulator | el = current value
            return arr.concat(el);  // return an array with the objects inside
        },[]);  // [] is the default value (empty array)
    
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;