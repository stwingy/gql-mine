const {  gql } = require('apollo-server');
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');
const typeDefs = gql(`
type Query{
    allUsers:[User]!
    allPosts:[Post]!
    onePost(id:ID!):Post
}
scalar JSON


type Mutation{
    createUser(name:String!,email:String!,password:String!):AuthUser
    signIn(email:String!,password:String!):AuthUser
    makePost(body:JSON!):Post
}
type Post{
    id:ID
    body:JSON!
    title:String
    author:AuthUser
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