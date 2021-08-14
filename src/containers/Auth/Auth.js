import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Auth extends Component {
	state = {
		controls: {
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
		isSignup: false,
	};

	componentWillMount() {
		if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath();
		}
	}

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

		let authRedirect = null;

		if (this.props.isAuth) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />;
		}

		return (
			<div className={styles.AuthContainer}>
				{authRedirect}
				<div className={styles.Auth}>
					{errorMessage}

					{this.state.isSignup ? (
						<h3>Create a new Account</h3>
					) : (
						<h3>Welcome Back</h3>
					)}

					<form onSubmit={event => this.submitHandler(event)}>
						{form}
						<Button btnType="Success">Submit</Button>
					</form>

					{this.state.isSignup ? (
						<>
							<p>
								<strong>Alredy have an account?</strong>
							</p>
							<button onClick={this.swhichAuthModeHandler}>
								Sign In
							</button>
						</>
					) : (
						<>
							<p>
								<strong>New User?</strong>
							</p>
							<button onClick={this.swhichAuthModeHandler}>
								Sign Up
							</button>
						</>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuth: state.auth.token != null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirect,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignup) =>
			dispatch(actions.auth(email, password, isSignup)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
