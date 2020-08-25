import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import Signup from './Signup';
import Logout from './Logout';
import Home from './site/Home';
import Nav from './site/Nav';
import ProtectedPage from './ProtectedPage';
import { PrivateRoute } from './PrivateRoute';
import { AuthProvider, useAuthState } from './AuthContext';
function App() {
	return (
		<div className="App">
			<Router>
				<AuthProvider>
					<Nav />
					<Switch>
						<Route path="/signup">
							<Signup />
						</Route>
						<Route path="/logout">
							<Logout />
						</Route>
						<Route exact path="/">
							<Home />
						</Route>
						<PrivateRoute path="/protected">
							<ProtectedPage />
						</PrivateRoute>
					</Switch>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
