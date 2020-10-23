import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProfileAbout from './ProfileAbout';
import ProfileBooks from './ProfileBooks';
import Spinner from '../common/Spinner';

import { connect } from 'react-redux';
import { getProfileByUsername } from '../../actions/profileActions';

class Profile extends Component {
	UNSAFE_componentDidMount() {
		if (this.props.match.params.username) {
			this.props.getProfileByUsername(this.props.match.params.username);
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.profile.profile === null && this.props.profile.loading) {
			this.props.history.push('/not-found');
		}
	}

	render() {
		const { profile, loading } = this.props.profile;
		let profileContent;

		if (profile === null || loading) {
			profileContent = <Spinner />;
		} else {
			profileContent = (
				<div>
					<div>
						<Link to="/profiles">Back To Profiles</Link>
					</div>

					<ProfileAbout profile={profile} />
					<ProfileBooks books={profile.books} />
				</div>
			);
		}

		return <div>{profileContent}</div>;
	}
}

Profile.propTypes = {
	getProfileByUsername: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getProfileByUsername }
)(Profile);
