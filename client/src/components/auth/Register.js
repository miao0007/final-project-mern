import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import './style.css';


import {
	Button,
	Form,
	Grid,
	Message,
	Header,
	Segment
} from 'semantic-ui-react';

class Register extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		password2: '',
		errors: {}
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, password2 } = this.state;
		const newUser = {
			name,
			email,
			password,
			password2
		};

		this.props.registerUser(newUser, this.props.history);
	};

	render() {
		const { errors } = this.state;

		return (
			<Grid verticalAlign="middle" centered columns={2}>
				<Grid.Column>
					<Header as="h2" color="blue" textAlign="center">
						<span className='title'>Create an account</span>
					</Header>
					<Form noValidate onSubmit={this.onSubmit} error className='form'>
						<Segment piled>
							
							<Form.Input
								placeholder="Name"
								name="name"
								type="name"
								value={this.state.name}
								onChange={this.onChange}
							/>
							<Message error content={errors.name} />
							<Form.Input
								placeholder="Email Address"
								name="email"
								type="email"
								value={this.state.email}
								onChange={this.onChange}
								
							/>
							<Message error content={errors.email} />
							<Form.Input
								placeholder="Password"
								name="password"
								type="password"
								value={this.state.password}
								onChange={this.onChange}
							/>
							<Message error content={errors.password} />
							<Form.Input
								placeholder="Confirm Password"
								name="password2"
								type="password"
								value={this.state.password2}
								onChange={this.onChange}
								error={errors.password2}
							/>
							<Message error content={errors.password2} />
							<Button basic color="blue" fluid size="large">
								Register
							</Button>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ registerUser }
)(withRouter(Register));
