import React from 'react';

import classes from './Order.module.css';

function Order(props) {
	const ingredients = [];
	for (const ingredientName in props.ingredients) {
		ingredients.push({
			name: ingredientName,
			ammount: props.ingredients[ingredientName],
		});
	}

	const ingOutput = ingredients.map(ing => {
		return (
			<span
				key={ing.name}
				style={{
					textTransform: 'capitalize',
					display: 'inline-block',
					margin: '0 8px',
					border: '1px solid #ccc',
					padding: '5px',
				}}
			>
				{ing.name} ({ing.ammount})
			</span>
		);
	});
	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingOutput} </p>
			<p>
				Price: <strong>${props.price.toFixed(2)}</strong>
			</p>
		</div>
	);
}

export default Order;
