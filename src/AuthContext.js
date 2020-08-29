import React from 'react';
import { gql, useQuery, useApolloClient } from '@apollo/client';
const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();
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
function authReducer(state, action) {
	switch (action.type) {
		case 'login': {
			return { ...state, isAuth: true, user: action.user };
		}
		case 'logout': {
			return { ...state, isAuth: false, user: null };
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}
function AuthProvider({ children }) {
	const token = localStorage.getItem('token');
	const { loading, error, data } = useQuery(CURRENT_USER, { variables: { token: token } });
	if (loading) console.log('loading');
	if (data) console.log('data', data);
	const initialState = token && data ? { isAuth: true, user: data.currentUser } : { isAuth: false, user: null };
	const [ state, dispatch ] = React.useReducer(authReducer, initialState);
	return (
		<AuthStateContext.Provider value={state}>
			<AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
}
function useAuthState() {
	const context = React.useContext(AuthStateContext);
	if (context === undefined) {
		throw new Error('useAuthState must be used within a AuthProvider');
	}
	return context;
}
function useAuthDispatch() {
	const context = React.useContext(AuthDispatchContext);
	if (context === undefined) {
		throw new Error('useAuthDispatch must be used within a AuthProvider');
	}
	return context;
}
export { AuthProvider, useAuthState, useAuthDispatch };
