import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';

import { Button, Form, Message, Header } from 'semantic-ui-react';
import './style.css';

class PostForm extends Component {
	state = {
		text: '',
		errors: {}
	};

	UNSAFE_componentWillReceiveProps(newProps) {
		if (newProps.errors) {
			this.setState({ errors: newProps.errors });
		}
	}

	onSubmit = (e) => {
		e.preventDefault();

		const { user } = this.props.auth;

		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar
		};

		this.props.addPost(newPost);
		this.setState({ text: '' });
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { errors } = this.state;

		return (
			<div>
				<div className='header'><Header as="h2">
					<span className='discuss'>Post a topic to discuss</span>
					</Header></div>
				
				<Form onSubmit={this.onSubmit} error>
					<Form.Input
						name="text"
						value={this.state.text}
						onChange={this.onChange}
						placeholder="Create a post"
					/>
					<Message error content={errors.text} />
					<Button basic color="blue">
						Submit
					</Button>
				</Form>
			</div>
		);
	}
}

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ addPost }
)(PostForm);
