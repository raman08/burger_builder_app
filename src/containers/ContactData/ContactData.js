import React, { Component } from 'react';

import axios from '../../axios_order';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

export class ContactData extends Component {
	state = {
		name: 'Raman',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
		ingredients: {},
		loading: false,
	};

	orderHandler = event => {
		event.preventDefault();

		this.setState({ loading: true });

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: this.state.name,
				address: {
					street: this.state.address.street,
					zipCode: this.state.address.postalCode,
					country: 'IN',
				},
				email: this.state.email,
				phoneNo: '+917558866223',
			},
			dileveryMethod: 'Fastest',
		};

		axios
			.post('/orders.json', order)
			.then(response => {
				console.log(response);
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch(err => {
				this.setState({ loading: false });
			});

		console.log(this.props.ingredients);
	};

	render() {
		let form = (
			<form>
				<input
					className={classes.Input}
					type="text"
					name="name"
					placeholder="Your Name"
				/>
				<input
					className={classes.Input}
					type="email"
					name="email"
					placeholder="Your Email"
				/>
				<input
					className={classes.Input}
					type="text"
					name="street"
					placeholder="Your Address"
				/>
				<input
					className={classes.Input}
					type="text"
					name="postalCode"
					placeholder="Your Postal Code"
				/>

				<Button btnType="Success" clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Contact Data</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
