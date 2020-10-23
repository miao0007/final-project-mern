import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

import { Container, Header } from 'semantic-ui-react';

class ProfileAbout extends Component {
	render() {
		const { profile } = this.props;

		// Get first name
		const firstName = profile.user.name.trim().split(' ')[0];

		return (
			<div>
				<Header textAlign="center">{firstName}'s Bio</Header>

				{isEmpty(profile.bio) ? (
					<Header as="span">{firstName} does not have a bio</Header>
				) : (
					<Container textAlign="center" fluid>
						{profile.bio}
					</Container>
				)}

				<hr />
				<Header
					as="h1"
					textAlign="center"
					content="Favorite genres:"
					subheader={profile.genres}
				/>

				<hr />
				{/* <Header.Item></Header.Item> */}
			</div>
		);
	}
}

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileAbout;
