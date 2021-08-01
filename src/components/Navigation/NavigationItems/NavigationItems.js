import React from 'react';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

function NavigationItems(props) {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem href="/" exact>
				Burger Builder
			</NavigationItem>

			<NavigationItem href="/orders">Your Orders</NavigationItem>
		</ul>
	);
}

export default NavigationItems;
