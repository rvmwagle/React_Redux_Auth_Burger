import React from 'react';
import classes from '../Burger/Burger.module.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    console.log(Object.keys(props.ingredients)); // returns keys of the object cheese, salad, bacon, meat as array
    let transformedIngredients=Object.keys(props.ingredients)
        .map(igKey => {
            console.log(igKey);// individual array values ex: cheese
            console.log(props.ingredients[igKey]) //returns size or value ex: 2
            return [...Array(props.ingredients[igKey])].map((_,i) => {
               return <BurgerIngredient key={igKey+i} type={igKey} />;
            });
        })
        .reduce((arr,el)=>{
            return arr.concat(el)
        },[])
    //reduce takes in 2 args current,prev and returns by reducing the array with some logic: 
    //here we concat the array
    console.log(transformedIngredients);
    if (transformedIngredients.length === 0){
        transformedIngredients = <p>Please add ingredients!</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;