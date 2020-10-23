import { SEARCH_BOOKS, GET_BOOK } from '../actions/types';

const initialState = {
	books: null,
	book: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SEARCH_BOOKS: {
			return {
				...state,
				books: action.payload
			};
		}
		case GET_BOOK: {
			return {
				...state,
				book: action.payload
			};
		}
		default:
			return state;
	}
}
