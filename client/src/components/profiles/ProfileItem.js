import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Card, Grid, List, Image } from 'semantic-ui-react';

class ProfileItem extends Component {
	render() {
		const { profile } = this.props;

		return (
			<Spacing>
				<Grid>
					<Card.Group>
						<Card raised>
							<Image src={profile.user.avatar} alt="" />
							<Card.Content>
								<Card.Header>{profile.user.name}</Card.Header>
								<Card.Meta>Favorite Genres:</Card.Meta>
								<List horizontal>
									<List.Item>{profile.genres}</List.Item>
								</List>
							</Card.Content>
							<Link to={`/profile/${profile.username}`}> View Profile </Link>
						</Card>
					</Card.Group>
				</Grid>
			</Spacing>
		);
	}
}

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileItem;

const Spacing = styled.div`
	margin-top: 3rem;
`;
