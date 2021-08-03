import React, { Component } from 'react';

import axios from '../../axios_order';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import classes from './ContactData.module.css';

export class ContactData extends Component {
	state = {
		// ingredients: {},
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name',
				},
				value: '',
				validation: { required: true },
				valid: false,
				touched: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Street',
				},
				value: '',
				validation: { required: true },
				valid: false,
				touched: false,
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Postal',
				},
				value: '',
				validation: { required: true, minLength: 5, maxLength: 5 },
				valid: false,
				touched: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Country',
				},
				value: '',
				validation: { required: true },
				valid: false,
				touched: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Mail',
				},
				value: '',
				validation: { required: true },
				valid: false,
				touched: false,
			},
			phoneNo: {
				elementType: 'input',
				elementConfig: {
					type: 'number',
					placeholder: 'Your Phone Number',
				},
				value: '',
				validation: { required: true },
				valid: false,
				touched: false,
			},
			dileveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheaptest', displayValue: 'Cheaptest' },
					],
				},
				value: 'fastest',
				valid: true,
				validation: {},
			},
		},
		loading: false,
		formIsValid: false,
	};

	checkValidity(value, rules) {
		let isValid = true;

		if (!rules) {
			return isValid;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	}

	orderHandler = event => {
		event.preventDefault();

		this.setState({ loading: true });

		const formData = {};

		for (const formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] =
				this.state.orderForm[formElementIdentifier].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
		};

		axios
			.post('/orders.json', order)
			.then(response => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch(err => {
				this.setState({ loading: false });
			});
	};

	inputChangeHandler = (event, inputIdentifier) => {
		const updatedOrderForm = { ...this.state.orderForm };
		const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid =
				updatedOrderForm[inputIdentifier].valid && formIsValid;
		}

		this.setState({
			orderForm: updatedOrderForm,
			formIsValid: formIsValid,
		});
	};

	render() {
		const formElementArray = [];

		for (const key in this.state.orderForm) {
			formElementArray.push({
				key: key,
				config: this.state.orderForm[key],
			});
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementArray.map(formElement => (
					<Input
						key={formElement.key}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={event =>
							this.inputChangeHandler(event, formElement.key)
						}
					/>
				))}

				<Button btnType="Success" disable={!this.state.formIsValid}>
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
