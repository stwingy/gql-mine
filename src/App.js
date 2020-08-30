import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import Editor from './draft/Editor'
import Posts from './draft/Posts'
import Sign from './Sign';
import Logout from './Logout';
import Home from './site/Home';
import Nav from './site/Nav';
import Footer from './Footer'
import ProtectedPage from './ProtectedPage';
import { PrivateRoute } from './PrivateRoute';
import { gql, useQuery } from "@apollo/client";
import {useAuthState, useAuthDispatch} from './AuthContext'

const CURRENT_USER = gql`
	query CurrentUser($token: String!) {
		currentUser(token: $token) {
			id
			name
			joinDate
			role
			email
		}
	}
`;
function App() {
	const {isAuth,user} = useAuthState()
	const dispatch = useAuthDispatch()
	 const token = localStorage.getItem('token');
	const { loading, error, data } = useQuery(CURRENT_USER, { variables: { token: token ||"" },onCompleted: (d) =>{ 
		if(d.currentUser){
			dispatch({type:"login",user:d.currentUser})
		}
		console.log("App",isAuth,user)
		} });

	return (
		<div >
		
			<Router>
				
					<Nav />
			
					<div className ='SubApp'>
					<Switch>
					<Route exact path="/post">
							<Editor />
						</Route>
						<Route exact path="/posts">
							<Posts />
						</Route>
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
			
			</Router>
			</div>
		
	);
}

export default App;
