const jwt = require('jsonwebtoken')
const {User} = require('./mongooseModelsUser')
require('dotenv').config({path:'variables.env'})

const createToken = ({id, role}) => jwt.sign({id, role }, process.env.SECRET)

const getUserFromToken =async (token) => {
  try {
    const user =  jwt.verify(token, process.env.SECRET)
    
   const newUser =await User.findOne({id: user.id})
   return newUser
  } catch (e) {
    return null
  }

}

const authenticated = next => (root, args, context, info) => {
  if(!context.user) throw new Error("nope not authenticated")
  return next(root, args, context, info)
}

const authorized = (role, next) => (root, args, context, info) => {
  if(context.user.role !==role) throw new Error("Not authorized")

  return next(root, args, context, info)
}

module.exports = {
  getUserFromToken,
  authenticated,
  authorized,
  createToken
}