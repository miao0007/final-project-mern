import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profileActions';

import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Books from './Books';

import { Button, Grid } from 'semantic-ui-react';
import './style.css';
class Dashboard extends Component {
	state = { open: false };

	open = () => this.setState({ open: true });
	close = () => this.setState({ open: false });

	UNSAFE_componentWillMount() {
		this.props.getCurrentProfile();
	}

	onDelete = () => {
		this.props.deleteAccount();
	};

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashboardContent;

		if (profile === null || loading) {
			dashboardContent = <Spinner />;
		} else {
			// Check if logged in user has profile data
			if (Object.keys(profile).length > 0) {
				dashboardContent = (
					<div>
						<h1 className='welcome'>
							Welcome:
							<Link to={`/profile/${profile.username}`}>{user.name}</Link>
						</h1>
						<Grid stackable columns={3}>
							<ProfileActions />
<div className='delete'><Button size="sm" variant="danger" color="red" onClick={this.onDelete} style={{ height: '2.8rem'}}>
								Delete My Account
							</Button></div>
							
						</Grid>
						<br />
						<Books books={profile.books} />
					</div>
				);
			} else {
				// User logged in but no profile
				dashboardContent = (
					<div>
						<p className = 'create-profile'>Please create your profile.</p>
						<Link to="/create-profile"><span className = 'create-link'>Create Profile</span>  </Link>
					</div>
				);
			}
		}
		return (
			<div>
				<h1 className='title'>Dashboard</h1>
				{dashboardContent}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

export default connect(
	mapStateToProps,
	{ deleteAccount, getCurrentProfile }
)(Dashboard);
