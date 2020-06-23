import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'},
    {label:'Bacon', type:'bacon'}
];

const buildControls = (props) => {

    const transformedControls = controls.map(obj => {
        return <BuildControl 
                    key={obj.type} 
                    label={obj.label} 
                    addedIngredient={() => props.addIngredient(obj.type)}
                    removeIngredient={() => props.removeIngredient(obj.type)}
                    disabled={props.disabled[obj.type]}
                />
    });

    const btnText = props.isAuthenticated ? 'ORDER NOW' : 'SIGN IN BEFORE ORDERING';
    return(
        <div className={classes.BuildControls}>
            <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
            {transformedControls}
            <button 
                // disabled={!(props.price > 4 ? true : false)} 
                disabled={!(props.purchasable)}
                className={classes.OrderButton}
                onClick={props.ordered}
                >{btnText}
            </button>
        </div>
    );    
};

export default buildControls;