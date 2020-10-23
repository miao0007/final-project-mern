import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import isEmpty from '../../validation/is-empty';

import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';

import { Button, Form, Message } from 'semantic-ui-react';
import './style.css';
class CreateProfile extends Component {
	state = {
		username: '',
		genres: '',
		bio: '',
		twitter: '',
		facebook: '',
		youtube: '',
		instagram: '',
		errors: {}
	};

	componentDidMount() {
		this.props.getCurrentProfile();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.profile.profile) {
			const profile = nextProps.profile.profile;

			// Bring genres array back to CSV
			// const genresCSV = profile.genres.join(', ');

			// If profile field doesnt exist, make empty string
			profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
			profile.social = !isEmpty(profile.social) ? profile.social : {};
			profile.twitter = !isEmpty(profile.social.twitter)
				? profile.social.twitter
				: '';
			profile.facebook = !isEmpty(profile.social.facebook)
				? profile.social.facebook
				: '';
			profile.youtube = !isEmpty(profile.social.youtube)
				? profile.social.youtube
				: '';
			profile.instagram = !isEmpty(profile.social.instagram)
				? profile.social.instagram
				: '';

			// Set component fields state
			this.setState({
				username: profile.username,
				genres: profile.genres,
				githubusername: profile.githubusername,
				bio: profile.bio,
				twitter: profile.twitter,
				facebook: profile.facebook,
				linkedin: profile.linkedin,
				youtube: profile.youtube
			});
		}
	}

	onSubmit = (e) => {
		e.preventDefault();

		const profileData = {
			username: this.state.username,
			genres: this.state.genres,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			youtube: this.state.youtube,
			instagram: this.state.instagram
		};

		this.props.createProfile(profileData, this.props.history);
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { errors } = this.state;

		return (
			<div>
				<Link to="/dashboard">Go Back</Link>
				<h1>Edit Profile</h1>

				<Form onSubmit={this.onSubmit} error>
					<Form.Input
						placeholder="* Profile Username"
						name="username"
						value={this.state.username}
						onChange={this.onChange}
						error={errors.username}
					/>
					<Message error content={errors.username} />
					<Form.Input
						placeholder="* genres"
						name="genres"
						value={this.state.genres}
						onChange={this.onChange}
						error={errors.genres}
						info="Place one space between genres"
					/>
					<Message error content={errors.genres} />
					<Form.TextArea
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
			</div>
		);
	}
}

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
