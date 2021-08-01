import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import Classes from './CheckOutSummery.module.css';

function CheckOutSummery(props) {
	return (
		<div className={Classes.CheckOutSummery}>
			<h1>We hope it taste Well</h1>
			<div style={{ width: '100%', margin: 'auto' }}>
				<Burger ingredients={props.ingredients} />
				<Button btnType="Danger" clicked={props.checkOutCanceled}>
					CANCEL
				</Button>
				<Button btnType="Success" clicked={props.checkOutContinued}>
					Continue
				</Button>
			</div>
		</div>
	);
}

export default CheckOutSummery;
