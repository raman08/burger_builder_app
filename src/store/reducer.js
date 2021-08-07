import * as actionTypes from './actions';

const INGREDIENTS_PRICE = {
	meat: 0.5,
	salad: 0.1,
	cheese: 0.3,
	bacon: 0.2,
};

const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0,
	},
	totalPrice: 2,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]:
						state.ingredients[action.ingredientName] + 1,
				},
				totalPrice:
					state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]:
						state.ingredients[action.ingredientName] - 1,
				},
				totalPrice:
					state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
			};

		default:
			return state;
	}
};

export default reducer;
