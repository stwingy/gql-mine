import React from 'react'
import { gql, useMutation } from "@apollo/client";
import {useAuthState, useAuthDispatch} from './AuthContext'
//import{isLoggedInVar} from './cache.ts'
const SIGNUP_USER =gql(`
mutation CreateUser($name:String!,$email:String!,$password:String!){
    createUser(name:$name,email:$email,password:$password){
    token
    user{
        id
        name
        email
        role
       joinDate
    }
  }
}`)

function Signup() {
    const initialState = {name:"",email:"",password:"",passwordconfirmation:""}
    const [state,setState] = React.useState(initialState)
    const[createUser,{loading: mutationLoading,error: mutationError,...data}] =useMutation(SIGNUP_USER)
 const {isAuth} = useAuthState()
 const dispatch = useAuthDispatch()
 console.log("isAuth",isAuth)
    const handleChange=(e)=>{
        setState({...state,[e.target.name]:e.target.value})
        
            }
            function validateForm(){

            }
            const handleSubmit =(e)=>{
                e.preventDefault()
                const {name,email,password}=state
                createUser({variables:{name,email,password}})
                 .then(({data})=>{
                 console.log("data",data)
         localStorage.setItem('token',data.createUser.token)
         dispatch({type:"login",user:data.createUser.user})
        //  console.log(isLoggedInVar())
        //  isLoggedInVar(true)
        //  console.log(isLoggedInVar())
                 setState(initialState)
               
             })
                .catch(err=>console.log(err))
            }
            
    return (
      
                 <div className="form-app">
         <h2 >Register</h2>
<form className = "form" onSubmit={handleSubmit}>
    <input type="text" name = "name" placeholder ="User Name" value={state.name} onChange={handleChange}/>
    <input type="email" name = "email" placeholder ="Email Address" value={state.email}  onChange={handleChange}/>
    <input type="password" name = "password" placeholder ="Password" value={state.password}  onChange={handleChange}/>
    <input type="password" name = "passwordconfirmation" placeholder ="Confirm Password" value={state.passwordconfirmation}  onChange={handleChange}/>
    <button type = "submit" className = "contactBtn sm" disabled={mutationLoading || validateForm()}>Submit</button>
    {mutationLoading && <p>Loading...</p>}
    {mutationError && <p>Error : Please try again {mutationError.message}</p>}
</form>
        </div>
    )
}

export default Signup
