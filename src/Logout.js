import React from 'react';
import { useAuthState, useAuthDispatch } from './AuthContext';
//import {isLoggedInVar} from './cache.ts'
import { useApolloClient } from '@apollo/client';
function Logout() {
	const dispatch = useAuthDispatch();
	const client = useApolloClient();
	const handleClick = () => {
		localStorage.clear();
		//client.cache.reset()
		client.cache.gc();
		dispatch('logout');
		//isLoggedInVar(false)
	};
	return (
		<div>
			<button onClick={handleClick}>Logout</button>
		</div>
	);
}

export default Logout;
