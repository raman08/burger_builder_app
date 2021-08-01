import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

function NavigationItem(props) {
	return (
		<li className={classes.NavigationItem}>
			<NavLink
				to={props.href}
				exact={props.exact}
				activeClassName={classes.active}
			>
				{props.children}
			</NavLink>
		</li>
	);
}

export default NavigationItem;
