import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData, history) => async (dispatch) => {
	try {
		await axios.post('/users/register', userData);
		await history.push('/login');
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};

// Login User - Get User Token
export const loginUser = (userData) => async (dispatch) => {
	try {
		const res = await axios.post('/users/login', userData);
		// Save to local storage
		const { token } = res.data;
		// Set token to local storage
		localStorage.setItem('jwtToken', token);
		// Set token to Auth header
		setAuthToken(token);
		// Decode token to get user data
		const decoded = jwt_decode(token);
		// Set current user
		dispatch(setCurrentUser(decoded));
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};

// Set logged in user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

// Log user out
export const logoutUser = () => (dispatch) => {
	// Remove token from local storage
	localStorage.removeItem('jwtToken');
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
