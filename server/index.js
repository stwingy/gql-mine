const { ApolloServer} = require('apollo-server');
const {typeDefs} = require('./typeDefs')
const {resolvers} =require( './resolvers.js')
const User = require('./mongooseModelsUser')
const mongoose = require("mongoose")
require('dotenv').config({path:'variables.env'})
const {createToken, getUserFromToken} = require('./auth')

mongoose
.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true})
.then(()=>console.log("DB connected"))
.catch((err)=>console.error(err))


const server = new ApolloServer({ typeDefs,
    resolvers,
    context({req}) {
        const token = req.headers.authorization
        console.log(token)
        const user = getUserFromToken(token)
        //console.log("user",user)
        return {User, user, createToken}
      }
 });
    

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});