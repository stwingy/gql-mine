import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from 'react-router-dom';

import Sign from './Sign';
import Logout from './Logout';
import Home from './site/Home';
import Nav from './site/Nav';
import Footer from './Footer'
import ProtectedPage from './ProtectedPage';
import { PrivateRoute } from './PrivateRoute';
import { AuthProvider, useAuthState } from './AuthContext';
function App() {
	return (
		<div className="MainApp">
			
			<Router>
				<AuthProvider>
					<Nav />
					<div className ='SubApp'>
					<Switch>
						<Route path="/sign">
							<Sign />
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
					</div>
					<Footer/>
				</AuthProvider>
			</Router>
			</div>
		
	);
}

export default App;
