import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

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
	building: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			const updatedIngredients = updateObject(state.ingredients, {
				[action.ingredientName]:
					state.ingredients[action.ingredientName] + 1,
			});

			const updatedState = {
				ingredients: updatedIngredients,
				totalPrice:
					state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
				building: true,
			};

			return updateObject(state, updatedState);

		case actionTypes.REMOVE_INGREDIENT:
			const updatedRemovedIngredients = updateObject(state.ingredients, {
				[action.ingredientName]:
					state.ingredients[action.ingredientName] - 1,
			});

			const updatedRemovedState = {
				ingredients: updatedRemovedIngredients,
				totalPrice:
					state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
				building: true,
			};

			return updateObject(state, updatedRemovedState);

		case actionTypes.SET_INGREDIENTS:
			const updatedSetIngredients = {
				ingredients: {
					salad: action.ingredients.salad,
					bacon: action.ingredients.bacon,
					cheese: action.ingredients.cheese,
					meat: action.ingredients.meat,
				},
				error: false,
				totalPrice: 2,
				building: false,
			};
			return updateObject(state, updatedSetIngredients);

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
