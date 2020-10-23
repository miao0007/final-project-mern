import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profileActions';

import Spinner from '../common/Spinner';

import ProfileItem from './ProfileItem';
import { Grid } from 'semantic-ui-react';

class Profiles extends Component {
	UNSAFE_componentDidMount = () => {
		this.props.getProfiles();
	};

	render() {
		const { profiles, loading } = this.props.profile;
		let profileItems;

		if (profiles === null || loading) {
			profileItems = <Spinner />;
		} else {
			if (profiles.length > 0) {
				profileItems = profiles.map((profile) => (
					<ProfileItem key={profile._id} profile={profile} />
				));
			} else {
				profileItems = <h4>No profiles found...</h4>;
			}
		}

		return (
			<div>
				<h1>Book Club Profiles</h1>
				<Grid doubling columns={3}>
					{profileItems}
				</Grid>
			</div>
		);
	}
}

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getProfiles }
)(Profiles);
