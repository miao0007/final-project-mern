import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

import { Menu, Segment, Image } from 'semantic-ui-react';

class Navbar extends Component {
	state = {};

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.clearCurrentProfile();
		this.props.logoutUser();
	};

	render() {
		const { activeItem } = this.state;
		const { isAuthenticated, user } = this.props.auth;

		const authLinks = (
			<Menu.Menu position="right">
				<Menu.Item
					as={Link}
					to="/discuss"
					name="Discussion"
					active={activeItem === 'Discussion'}
					onClick={this.handleItemClick}
				/>

				<Menu.Item
					as={Link}
					to="/dashboard"
					name="Dashboard"
					active={activeItem === 'Dashboard'}
					onClick={this.handleItemClick}
				/>
				<Menu.Item>
					<div onClick={this.onLogoutClick}>
						<Image
							src={user.avatar}
							avatar
							alt={user.name}
							style={{ width: '25px', marginRight: '5px' }}
							title="You must have a Gravatar connected to your email to display an image"
						/>
						Logout
					</div>
				</Menu.Item>
			</Menu.Menu>
		);

		const guestLinks = (
			<Menu.Menu position="right">
				<Menu.Item
					as={Link}
					to="/register"
					name="Sign Up"
					active={activeItem === 'Sign Up'}
					onClick={this.handleItemClick}
				/>

				<Menu.Item
					as={Link}
					to="/login"
					name="Login"
					active={activeItem === 'Login'}
					onClick={this.handleItemClick}
				/>
			</Menu.Menu>
		);

		return (
			<Segment className="three" color='violet' inverted>
				<Menu className="ui stackable menu three" color='violet' inverted secondary>
					<Menu.Item
						className="item"
						as={Link}
						to="/profiles"
						name="Book Club Members"
						active={activeItem === 'Book Club Members'}
						onClick={this.handleItemClick}
					/>

					<Menu.Item
						as={Link}
						to="/books"
						name="Search For Books"
						className="item"
						active={activeItem === 'Search For Books'}
						onClick={this.handleItemClick}
					/>

					{isAuthenticated ? authLinks : guestLinks}
				</Menu>
			</Segment>
		);
	}
}

Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ clearCurrentProfile, logoutUser }
)(Navbar);
