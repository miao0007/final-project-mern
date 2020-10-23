const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBookInput(data) {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.authors = !isEmpty(data.authors) ? data.authors : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  // data.ebookLink = !isEmpty(data.ebookLink) ? data.ebookLink : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Book title is required';
  }

  if (Validator.isEmpty(data.authors)) {
    errors.authors = 'Author(s) is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description is required';
  }
  // if (Validator.isEmpty(data.ebookLink)) {
  //   errors.ebookLink = 'Ebook Link is required';
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
