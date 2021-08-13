import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Auth extends Component {
	state = {
		controls: {
			// name: {
			// 	elementType: 'input',
			// 	elementConfig: {
			// 		type: 'text',
			// 		placeholder: 'Your Name',
			// 	},
			// 	value: '',
			// 	validation: { required: true },
			// 	valid: false,
			// 	touched: false,
			// },
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email',
				},
				value: '',
				validation: { required: true, isEmail: true },
				valid: false,
				touched: false,
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Your Password',
				},
				value: '',
				validation: { required: true, minLength: 6 },
				valid: false,
				touched: false,
			},
		},
		isSignup: true,
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

		if (rules.isEmail) {
			const pattren =
				/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			isValid = pattren.test(value) && isValid;
		}

		return isValid;
	}

	swhichAuthModeHandler = () => {
		this.setState(prevState => {
			return { isSignup: !prevState.isSignup };
		});
	};

	inputChangeHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(
					event.target.value,
					this.state.controls[controlName].validation
				),
				touched: true,
			},
		};

		this.setState({ controls: updatedControls });
	};

	submitHandler = event => {
		event.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignup
		);
	};

	render() {
		const formElementArray = [];

		for (const key in this.state.controls) {
			formElementArray.push({
				id: key,
				config: this.state.controls[key],
			});
		}

		let form = formElementArray.map(formElement => (
			<Input
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={event =>
					this.inputChangeHandler(event, formElement.id)
				}
			/>
		));

		if (this.props.loading) {
			form = <Spinner />;
		}

		let errorMessage = null;

		if (this.props.error) {
			errorMessage = <p>{this.props.error.message}</p>;
		}

		return (
			<div className={styles.AuthContainer}>
				<div className={styles.Auth}>
					{errorMessage}
					<form onSubmit={event => this.submitHandler(event)}>
						{form}
						<Button btnType="Success">Submit</Button>
					</form>
					<Button
						btnType="Danger"
						clicked={this.swhichAuthModeHandler}
					>
						Swhich to {this.state.isSignup ? 'SignIn' : 'SignUp'}
					</Button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignup) =>
			dispatch(actions.auth(email, password, isSignup)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
