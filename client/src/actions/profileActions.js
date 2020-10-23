import axios from 'axios';
import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_LOADING,
	GET_ERRORS,
	CLEAR_CURRENT_PROFILE,
	SET_CURRENT_USER
} from './types';

// Get current profile
export const getCurrentProfile = () => async (dispatch) => {
	dispatch(setProfileLoading());
	try {
		const res = await axios.get('/profile');
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: GET_PROFILE,
			payload: {}
		});
	}
};

// Get profile by handle
export const getProfileByUsername = (username) => async (dispatch) => {
	dispatch(setProfileLoading());
	try {
		const res = await axios.get(`/profile/username/${username}`);
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: GET_PROFILE,
			payload: null
		});
	}
};

// Create Profile
export const createProfile = (profileData, history) => async (dispatch) => {
	try {
		await axios.post('/profile', profileData);
		history.push('/dashboard');
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data
		});
	}
};

// Add Book
export const addBooks = (bookData, history) => async (dispatch) => {
	try {
		await axios.post('/profile/books', bookData);
		history.push('/dashboard');
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data
		});
	}
};

// Delete Book
export const deleteBook = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/profile/books/${id}`);
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data
		});
	}
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
	dispatch(setProfileLoading());
	try {
		const res = await axios.get('/profile/all');
		dispatch({
			type: GET_PROFILES,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: GET_PROFILES,
			payload: null
		});
	}
};
// Delete account and profile
export const deleteAccount = () => async (dispatch) => {
	try {
		if (window.confirm('Are you sure? This can NOT be undone!')) {
			await axios.delete('/profile');
			dispatch({
				type: SET_CURRENT_USER,
				payload: {}
			});
		}
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data
		});
	}
};

// Profile Loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	};
};

// Clear profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	};
};
