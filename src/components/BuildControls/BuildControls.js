import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' },
];

function BuildControls(props) {
	return (
		<div className={classes.BuildControls}>
			<p>
				Current Price:{' '}
				<strong>
					<small>${props.totalPrice.toFixed(2)}</small>
				</strong>
			</p>
			{controls.map(control => (
				<BuildControl
					key={control.label}
					label={control.label}
					added={() => props.ingredientAdded(control.type)}
					removed={() => props.ingredientRemoved(control.type)}
					disabled={props.disabled[control.type]}
				/>
			))}
			<button
				className={classes.OrderButton}
				disabled={!props.purchasable}
				onClick={props.ordering}
			>
				{props.isAuth ? 'ORDER NOW' : 'Login to Order'}
			</button>
		</div>
	);
}

export default BuildControls;
