import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Card, Grid } from 'semantic-ui-react';
import FlipMove from 'react-flip-move';

const BookList = ({ book }) => {
	return (
		<Spacing>
			<Grid>
				<Card.Group>
					<FlipMove enterAnimation="accordionHorizontal">
						<Card raised>
							<Card.Content
								textAlign="center"
								as={Link}
								to={`/book/${book.id}`}
							>
								<Card.Header>{book.volumeInfo.title}</Card.Header>
								{book.volumeInfo.imageLinks && (
									<ImageSize
										src={book.volumeInfo.imageLinks.thumbnail}
										alt=""
									/>
								)}
							</Card.Content>
						</Card>
					</FlipMove>
				</Card.Group>
			</Grid>
		</Spacing>
	);
};
export default BookList;

const Spacing = styled.div`
	margin-top: 3rem;
`;

const ImageSize = styled.img`
	height: 205px;
	width: 128px;
`;
