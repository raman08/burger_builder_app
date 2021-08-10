import * as actionTypes from '../actions/actionsTypes';

const INGREDIENTS_PRICE = {
	meat: 0.5,
	salad: 0.1,
	cheese: 0.3,
	bacon: 0.2,
};

const initialState = {
	ingredients: null,
	totalPrice: 2,
	error: false,
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

		case actionTypes.SET_INGREDIENTS:
			console.log(action.ingredients);
			return {
				...state,
				ingredients: action.ingredients,
				error: false,
			};

		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true,
			};
		default:
			return state;
	}
};

export default reducer;
