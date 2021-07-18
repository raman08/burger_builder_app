import React from 'react';

import classes from './Logo.module.css';
import burgerLogo from '../../assets/Images/burger-logo.png';

function Logo(props) {
	return (
		<div className={classes.Logo}>
			<img src={burgerLogo} alt='Burger Logo' />
		</div>
	);
}

export default Logo;
