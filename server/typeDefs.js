const {  gql } = require('apollo-server');

const typeDefs = gql(`
type Query{
    allUsers:[User]!
}
type Mutation{
    createUser(name:String!,email:String!,password:String!):AuthUser
    signIn(email:String!,password:String!):AuthUser
}
type User{
    id:ID!
    name:String
    email:String!
    password:String!
    role:roleState
    joinDate:String
}
type AuthUser {
    token: String!
    user: User!
  }
enum roleState{
    USER
    ADMIN
}

`)
module.exports ={typeDefs}