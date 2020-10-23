import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteBook } from '../../actions/profileActions';

import { Button, Card, Grid, Header, Image } from 'semantic-ui-react';

import styled from 'styled-components';

class Books extends Component {
	onDeleteClick(id) {
		this.props.deleteBook(id);
	}

	render() {
		return (
			<div>
				<Header as="h1" dividing textAlign="center">
					<span className='bookshelf'>Bookshelf</span>
				</Header>
				<Spacing>
					<Grid stackable columns={3}>
						{this.props.books.map((book) => (
							<div key={book._id}>
								<Card.Group>
									<Card style={{ width: '15rem' }}>
										<Card.Content>
											<Card.Header>{book.title}</Card.Header>
											{/* <Card.Meta>
												<h3>{book.subtitle}</h3>
												<p>{book.authors}</p>
											</Card.Meta> */}
											<Image src={book.imageLink} alt="" />
											<br />
											<br />
											<Button
												color='red'
												size="sm"
												variant="warning"
												onClick={this.onDeleteClick.bind(this, book._id)}
											>
												Delete
											</Button>
										</Card.Content>
									</Card>
								</Card.Group>
								<div className='polygon'></div>
							</div>
						))}
					</Grid>
				</Spacing>
			</div>
		);
	}
}

Books.propTypes = {
	deleteBook: PropTypes.func.isRequired
};

export default connect(
	null,
	{ deleteBook }
)(Books);

const Spacing = styled.div`
	margin-top: 3rem;
`;
