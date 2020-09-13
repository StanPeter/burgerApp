import * as actionTypes from "store/actions/actionTypes";

const initialState = {
    burgerPrice: 1.4,
    ingredients: null,
    error: false,
};

const ingredientsPrices = {
    salad: 0.2,
    bacon: 0.4,
    cheese: 0.6,
    meat: 0.9
}

const burgerReducer = (state = initialState, action) => {
    const updatedState = {...state};

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            updatedState.ingredients = {
                ...state.ingredients,
                //ingredients would otherwise still point to the previous one -> woudn't be inmutable
                //get that one name and increase by 1
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
            };
            updatedState.burgerPrice = state.burgerPrice + ingredientsPrices[action.ingredientName];

            break;
        case actionTypes.REMOVE_INGREDIENT:
            updatedState.ingredients = {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] > 0 ?
                    state.ingredients[action.ingredientName] - 1 : 0
            };
            updatedState.burgerPrice = state.burgerPrice - ingredientsPrices[action.ingredientName];

            break;
        case actionTypes.SET_INGREDIENTS:
            updatedState.burgerPrice = 1.4;
            updatedState.ingredients = {
                salad: action.ingredients.salad,
                bacon: action.ingredients.bacon,
                cheese: action.ingredients.cheese,
                meat: action.ingredients.meat,
            };

            break;
        case actionTypes.FETCH_ERROR_INGREDIENTS:
            updatedState.error = true;
            
            break;
        default:
            break;
    } 

    return updatedState;
};

export default burgerReducer;
