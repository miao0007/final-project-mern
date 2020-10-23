import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { searchedBooks } from '../../actions/bookActions';

import BookList from './BookList';

import { Button, Form, Grid } from 'semantic-ui-react';

class Search extends Component {
	state = {
		search: '',
		errors: {}
	};

	searchBooks = (e) => {
		e.preventDefault();
		this.props.searchedBooks(this.state.search);
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { books } = this.props.books;

		let bookResults;
		if (books === null) {
			bookResults = null;
		} else {
			if (books.length > 0) {
				bookResults = books.map((book) => (
					<BookList key={book.id} book={book} />
				));
			} else {
				bookResults = <h2>No results found...</h2>;
			}
		}

		return (
			<div>
				<Form>
					<p>Search by title or author</p>
					<Form.Field width="8">
						<input
							onChange={this.onChange}
							type="text"
							name="search"
							placeholder="Title or Author(s)"
							value={this.state.search}
						/>
					</Form.Field>
					<Button className="ui black basic button" onClick={this.searchBooks}>
						Search
					</Button>
				</Form>

				<Grid textAlign="center" stackable>
					{bookResults}
				</Grid>
			</div>
		);
	}
}

Search.propTypes = {
	books: PropTypes.object.isRequired,
	searchedBooks: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	books: state.books
});

export default connect(
	mapStateToProps,
	{ searchedBooks }
)(Search);
