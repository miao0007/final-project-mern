import axios from 'axios';

import { GET_ERRORS, SEARCH_BOOKS, GET_BOOK } from './types';

export const searchedBooks = (search) => async (dispatch) => {

	try {
		const res = await axios.get("/api/books/" + search, {
			transformRequest: [
				(data, headers) => {
					delete headers['access-token'];
					delete headers['uid'];
					delete headers['client'];
					delete headers['expiry'];
					delete headers['token-type'];
					delete headers.common;
					return data;
				}
			]
		});
		// const res = await fetch("/api/books/" + search).then(res => res.json()).then(data => {
		// 	return data;
		// })
		dispatch({
			type: SEARCH_BOOKS,
			payload: res.data.items
		});
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data
		});
	}
};

export const getBook = (id) => async (dispatch) => {
	const url = `https://www.googleapis.com/books/v1/volumes/${id}`;
	try {
		const res = await axios.get(url, {
			transformRequest: [
				(data, headers) => {
					delete headers['access-token'];
					delete headers['uid'];
					delete headers['client'];
					delete headers['expiry'];
					delete headers['token-type'];
					delete headers.common;
					return data;
				}
			]
		});
		dispatch({
			type: GET_BOOK,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data
		});
	}
};

// Save Searched Book
export const saveBook = (savedData, history) => async (dispatch) => {
	try {
		await axios.post('/profile/books', savedData);
		history.push('/dashboard');
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data
		});
	}
};
