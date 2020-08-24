import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import Signup from './Signup';
import Logout from './Logout';
import ProtectedPage from './ProtectedPage'
import {PrivateRoute} from './PrivateRoute'
import {AuthProvider,useAuthState} from './AuthContext'
function App() {
	return (
		<div className="App">
			<Router>
        <AuthProvider>
				<Switch>
					<Route path="/signup">
						<Signup />
					</Route>
					<Route path="/logout">
						<Logout />
					</Route>
          <PrivateRoute path="/protected" >
            <ProtectedPage />
          </PrivateRoute>
				</Switch>
        </AuthProvider>
			</Router>
		</div>
	);
}

export default App;
