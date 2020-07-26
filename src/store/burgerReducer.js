import * as actionTypes from "./action";

const initialState = {
    burgerPrice: 1.4,
    ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0,
    },
};

const ingredientsPrices = {
    salad: 0.2,
    bacon: 0.4,
    cheese: 0.6,
    meat: 0.9
}

const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    //ingredients would otherwise still point to the previous one -> woudn't be inmutable
                    //get that one name and increase by 1
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                },
                burgerPrice: state.burgerPrice + ingredientsPrices[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] > 0 ?
                        state.ingredients[action.ingredientName] - 1 : 0
                },
                burgerPrice: state.burgerPrice - ingredientsPrices[action.ingredientName]
            }
        default:
            return state;
    } 
};


export default burgerReducer;
