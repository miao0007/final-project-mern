import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Button, Form, Grid, Message, Header } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
	state = {
		displaySocialInputs: false,
		bio: '',
		username: '',
		genres: '',
		instagram: '',
		facebook: '',
		twitter: '',
		errors: {}
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();
		const { username, bio, genres } = this.state;
		const profileData = {
			username,
			genres,
			bio
		};
		this.props.createProfile(profileData, this.props.history);
	};

	render() {
		const { errors } = this.state;

		return (
			<Grid verticalAlign="middle" centered columns={2}>
				<Grid.Column>
					<Header as="h2" color="blue" textAlign="center">
						Create your profile
					</Header>
					<small>* = required fields</small>
					<Form onSubmit={this.onSubmit}>
						<Form.Input
							placeholder="* Username"
							name="username"
							value={this.state.username}
							onChange={this.onChange}
							error={errors.username}
							info="A unique username for your profile url."
						/>
						<Message error content={errors.username} />
						<Form.Input
							placeholder="* Favorite Genres"
							name="genres"
							value={this.state.genres}
							onChange={this.onChange}
							error={errors.genres}
							info="List your favorite genres. Enter at least one."
						/>
						<Message error content={errors.genres} />
						<Form.Input
							placeholder="Short Bio"
							name="bio"
							value={this.state.bio}
							onChange={this.onChange}
							error={errors.bio}
							info="Tell us a little about yourself"
						/>
						<Message error content={errors.bio} />
						<Button basic color="blue" fluid size="large">
							Submit
						</Button>
					</Form>
				</Grid.Column>
			</Grid>
		);
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ createProfile }
)(withRouter(CreateProfile));
