import React from 'react';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

function NavigationItems(props) {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem href="/" exact>
				Burger Builder
			</NavigationItem>

			{props.isAuth ? (
				<NavigationItem href="/orders">Your Orders</NavigationItem>
			) : null}

			{!props.isAuth ? (
				<NavigationItem href="/auth">Login/Signup</NavigationItem>
			) : (
				<NavigationItem href="/logout">Logout</NavigationItem>
			)}
		</ul>
	);
}

export default NavigationItems;
