import React from 'react';
import './BuildControls.css';
import BuildControl from 'components/Burger/BuildControls/BuildControl/BuildControl';


const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
]

const BuildControls = (props) => {

    return (
        <div className='BuildControls'>
            <p>Current Price: <strong>{props.burgerPrice.toFixed(2)}€</strong></p>
            { controls.map(ctrl => (
                <BuildControl 
                    label={ctrl.label}
                    key={ctrl.label}
                    addIngredient={() => props.addIngredient(ctrl.type)}
                    removeIngredient={() => props.removeIngredient(ctrl.type)} 
                    disabled={props.disabledInfo[ctrl.type]}
                />
            ))}
            <button className='OrderButton' 
                    disabled={!props.purchasableInfo}
                    onClick={props.purchasing}>ORDER</button>
        </div>
    );
}

export default BuildControls