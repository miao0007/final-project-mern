import React, { Component } from 'react';
import styled from 'styled-components';

import { Card, Grid, Image } from 'semantic-ui-react';

class ProfileBooks extends Component {
	render() {
		const { books } = this.props;

		const bookItems = books.map((book) => (
			<div key={book._id}>
				<Spacing>
					<Card.Group>
						<Card raised>
							<Card.Content textAlign="center">
								<Card.Header>{book.title}</Card.Header>
								<Card.Meta>{book.subtitle}</Card.Meta>

								<Card.Meta>
									Author(s):
									{book.authors}
								</Card.Meta>

								{book.imageLink === '' ? null : (
									<Image src={book.imageLink} alt="" />
								)}
							</Card.Content>
						</Card>
					</Card.Group>
				</Spacing>
			</div>
		));

		return (
			<div>
				<div>
					<BookHeading>Books</BookHeading>
					<hr />
					{bookItems.length > 0 ? (
						<Grid textAlign="center" stackable columns="3">
							{bookItems}
						</Grid>
					) : (
						<p>No Books Listed</p>
					)}
				</div>
			</div>
		);
	}
}

export default ProfileBooks;
const BookHeading = styled.h1`
	display: flex;
	justify-content: center;
`;

const Spacing = styled.div`
	margin-top: 3rem;
`;
