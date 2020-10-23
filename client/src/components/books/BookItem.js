import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getBook, saveBook } from '../../actions/bookActions';

import BookInfo from './BookInfo';

class BookItem extends Component {
	UNSAFE_componentWillMount() {
		this.props.getBook(this.props.match.params.id);
	}

	render() {
		let { book } = this.props.book;

		let bookInfo;

		if (book !== null) {
			const onSave = (e) => {
				e.preventDefault();

				const regex = /(<([^>]+)>)/gi;

				let bookDesc;

				if (!book.volumeInfo.description) {
					bookDesc = 'No Info Available';
				} else {
					bookDesc = book.volumeInfo.description.replace(regex, '');
				}

				let bookThumb;

				if (!book.volumeInfo.imageLinks) {
					bookThumb = 'No Image Available';
				} else {
					bookThumb = book.volumeInfo.imageLinks.thumbnail;
				}

				let bookAuth = book.volumeInfo.authors.join(',');
				let savedData = {
					title: book.volumeInfo.title,
					subtitle: book.volumeInfo.subtitle,
					authors: bookAuth,
					description: bookDesc,
					imageLink: bookThumb
				};
				this.props.saveBook(savedData, this.props.history);
			};
			bookInfo = <BookInfo book={book} onClick={onSave} />;
		}

		return <div>{bookInfo}</div>;
	}
}

BookItem.propTypes = {
	book: PropTypes.object.isRequired,
	getBook: PropTypes.func.isRequired,
	saveBook: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	book: state.books
});

export default connect(
	mapStateToProps,
	{ getBook, saveBook }
)(BookItem);
