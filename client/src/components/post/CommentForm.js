import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addComment } from '../../actions/postActions';

import { Button, Form, Grid, Message, Header } from 'semantic-ui-react';

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		if (newProps.errors) {
			this.setState({ errors: newProps.errors });
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const { user } = this.props.auth;
		const { postId } = this.props;

		const newComment = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar
		};

		this.props.addComment(postId, newComment);
		this.setState({ text: '' });
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors } = this.state;

		return (
			<Grid verticalAlign="middle" centered columns={2}>
				<Grid.Column>
					<Header as="h2" color="blue" textAlign="center">
						Reply
					</Header>
					<Form onSubmit={this.onSubmit} error>
						<Form.TextArea
							placeholder="Reply to post"
							name="text"
							value={this.state.text}
							onChange={this.onChange}
						/>
						<Message error content={errors.text} />
						<Button basic color="blue" fluid size="large">
							Submit
						</Button>
					</Form>
				</Grid.Column>
			</Grid>
		);
	}
}

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ addComment }
)(CommentForm);
