import React from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Container, Header, Grid } from 'semantic-ui-react';

const BookInfo = ({ book, onClick }) => {
	const regex = /(<([^>]+)>)/gi;

	return (
		<Grid stackable container textAlign="center" columns={2}>
			<Grid.Column width="5">
				{book.volumeInfo.imageLinks && (
					<BookCover src={book.volumeInfo.imageLinks.thumbnail} alt="" />
				)}
			</Grid.Column>

			<Grid.Column textAlign="left">
				<Container fluid>
					<Header as="h2">{book.volumeInfo.title}</Header>
					<Header as="h4">{book.volumeInfo.subtitle}</Header>
					{!book.volumeInfo.description ? (
						<Warning>No Info Available</Warning>
					) : (
							<p>{book.volumeInfo.description.replace(regex, '')}</p>
						)}
					{book.saleInfo.isEbook ? 'Ebook Available ' : 'No Ebook Available'}
					<br />
					{book.saleInfo.isEbook && (
						<Button
							as="a"
							href={book.saleInfo.buyLink}
							basic
							color="blue"
							target="_blank"
						>
							Buy
						</Button>
					)}
					<Button onClick={onClick} basic color="blue">
						Save to Bookshelf
					</Button>
				</Container>
			</Grid.Column>
		</Grid>
	);
};

export default BookInfo;

const BookCover = styled.img`
	box-shadow: 0 0 35px black;
`;

const Warning = styled.h2`
	color: red;
`;
