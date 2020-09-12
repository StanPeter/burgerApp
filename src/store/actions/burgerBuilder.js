import * as actionTypes from 'store/actions/actionTypes';
import axios from 'api/orders';

export const addIngredient = (ingName) => {
    return ({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    });
};

export const removeIngredient = (ingName) => {
    return ({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    });
};

export const setIngredients = (ingredients) => {
    return ({
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    })
}

export const fetchErrorIngredients = () => {
    return ({
        type: actionTypes.FETCH_ERROR_INGREDIENTS,
    })
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://tastyburgs.firebaseio.com/ingredients.json')
        .then(response => dispatch(setIngredients(response.data)))
        .catch(error => dispatch(fetchErrorIngredients()));
    }
}


