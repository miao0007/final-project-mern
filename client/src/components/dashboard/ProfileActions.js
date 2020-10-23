import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
const ProfileActions = () => {
	return (
		<div className='buttons'>
			<Link to="/edit-profile">
				<Button  variant='success' color='green'>
					Edit Profile
				</Button>
			</Link>
			<Link to="/books">
				<Button variant="warning" color="yellow">
					Find Books
				</Button>
			</Link>
		</div>
	);
};

export default ProfileActions;
