import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponet, axios) => {
	return class extends Component {
		state = {
			error: null,
		};

		componentWillMount() {
			this.reqInterceptors = axios.interceptors.request.use(req => {
				this.setState({ error: null });
				return req;
			});

			this.resInterceptors = axios.interceptors.response.use(
				res => res,
				error => {
					this.setState({ error: error });
				}
			);
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptors);
			axios.interceptors.response.eject(this.resInterceptors);
		}

		errorConfirmHandler = () => {
			this.setState({ error: null });
		};

		render() {
			return (
				<>
					<Modal
						show={this.state.error}
						modalClosed={this.errorConfirmHandler}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponet {...this.props} />
				</>
			);
		}
	};

	// return props => {
	// 	return (
	// 		<>
	// 			<Modal show>Some ERROR</Modal>
	// 			<WrappedComponet {...props} />
	// 		</>
	// 	);
	// };
};

export default withErrorHandler;
