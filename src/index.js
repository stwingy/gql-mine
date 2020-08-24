import React from 'react';
import ReactDOM from 'react-dom';
import {cache} from './cache.ts'
import {ApolloProvider, ApolloClient,gql} from '@apollo/client'
import App from './App'

// const typeDefs =gql`
// extend type Query{
//   isLoggedIn:Boolean
// }
// `

const client = new ApolloClient({
    uri: "http://localhost:4000",
    headers: {
      authorization: localStorage.getItem('token') || ''
    },
    cache,
    // typeDefs
  });
ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
   </ApolloProvider>,
    document.getElementById('root')
  );


