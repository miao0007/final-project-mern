import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import './style.css';
import {
	Button,
	Form,
	Grid,
	Message,
	Header,
	Segment
	// Divider
} from 'semantic-ui-react';

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: {}
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}

		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onSubmit = (e) => {
		e.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password
		};

		this.props.loginUser(userData);
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { errors } = this.state;

		return (
			<div className='container'>
				<Grid verticalAlign="middle" centered columns={2} >
				<Grid.Column>
					<Header as="h2" textAlign="center">
						<span class='title'>Please Log in to your account</span>
					</Header>
					<Form noValidate onSubmit={this.onSubmit} error>
						<Segment piled>
							<Form.Input
								placeholder="Email Address"
								label="Your E-Mail"
								name="email"
								type="email"
								value={this.state.email}
								onChange={this.onChange}
								icon="user"
								iconPosition="left"
							/>
							<Message error content={errors.email} />

							<Form.Input
								placeholder="Password"
								label="Password"
								name="password"
								type="password"
								value={this.state.password}
								onChange={this.onChange}
								fluid
								icon="lock"
								iconPosition="left"
							/>
							<Message error content={errors.password} />

							<Button basic color="blue" fluid size="large">
								Login
							</Button>
						</Segment>
					</Form>

					<Message>
						Not a Member Yet? Please <Link to="/register"> Sign Up</Link>
					</Message>
				</Grid.Column>
			</Grid>
			</div>
			
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ loginUser }
)(Login);
