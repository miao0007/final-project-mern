import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setCurrentUser, logoutUser } from './actions/authActions';

import Navbar from './components/Navbar';
import Landing from './components/home/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profiles from './components/profiles/Profiles';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import Search from './components/books/Search';

import BookItem from './components/books/BookItem';
import Posts from './components/posts/Posts';

import PrivateRoute from './components/common/PrivateRoute';

import { Container } from 'semantic-ui-react';

import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import { clearCurrentProfile } from './actions/profileActions';
import Post from './components/post/Post';
import Profile from './components/profile/Profile';

//Check for token
if (localStorage.jwtToken) {
	//Set Auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());
		// Clear current Profile
		store.dispatch(clearCurrentProfile());
		// Redirect to login
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Container>
						<Navbar />
						<Route exact path="/" component={Landing} />
						<Route path="/register" component={Register} />
						<Route path="/login" component={Login} />
						<Switch>
							<PrivateRoute path="/dashboard" component={Dashboard} />
							<Route path="/profiles" component={Profiles} />
							<Route path="/profile/:username" component={Profile} />
							<PrivateRoute path="/create-profile" component={CreateProfile} />
							<PrivateRoute path="/edit-profile" component={EditProfile} />
							<PrivateRoute path="/books" component={Search} />
							<PrivateRoute path="/book/:id" component={BookItem} />
							<PrivateRoute path="/discuss" component={Posts} />
							<PrivateRoute path="/post/:id" component={Post} />
						</Switch>
					</Container>
				</Router>
			</Provider>
		);
	}
}

export default App;
