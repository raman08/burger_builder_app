import React from 'react';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

function NavigationItems(props) {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem href='/' active>
				Burger Builder
			</NavigationItem>

			<NavigationItem href='/checkout'>Checkout</NavigationItem>
		</ul>
	);
}

export default NavigationItems;
