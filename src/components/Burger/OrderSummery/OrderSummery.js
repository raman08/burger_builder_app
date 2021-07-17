import React from 'react';

import Button from '../../UI/Button/Button';

function OrderSummery(props) {
	const ingredientsSummery = Object.keys(props.ingredients).map(key => {
		return (
			<li key={key}>
				<span style={{ textTransform: 'capitalize' }}>{key}</span>:
				{` ${props.ingredients[key]}`}
			</li>
		);
	});

	return (
		<>
			<h3>Your Order</h3>
			<p>
				A delecious burger that you have created with following
				ingredients:
			</p>

			<ul>{ingredientsSummery}</ul>

			<p>
				<strong>Total Price: ${props.totalPrice.toFixed(2)}</strong>
			</p>
			<p>Continue With CheckOut?</p>

			<Button btnType='Danger' clicked={props.purchasedCancelled}>
				CANCEL
			</Button>
			<Button btnType='Success' clicked={props.purchaseContinued}>
				CONTINUE
			</Button>
		</>
	);
}

export default OrderSummery;
