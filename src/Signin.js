import React from 'react'
import { gql, useMutation } from "@apollo/client";
import {useAuthState, useAuthDispatch} from './AuthContext'
//import{isLoggedInVar} from './cache.ts'
const SIGNIN_USER =gql(`
mutation signIn($email:String!,$password:String!){
    signIn(email:$email,password:$password){
        user{
            id
            name
            email
            role
            joinDate
        }
    token
  
  }
}`)

function Signin() {
    const initialState = {email:"",password:""}
    const [state,setState] = React.useState(initialState)
    const[signIn,{loading: mutationLoading,error: mutationError,...data}] =useMutation(SIGNIN_USER)
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
                const {email,password}=state
                console.log(email,password)
                signIn({variables:{email,password}})
                 .then(({data})=>{
                 if(data){
                     console.log(data)
                    localStorage.setItem('token',data.signIn.token)
                    dispatch({type:"login",user:data.signIn.user})
                 
                            setState(initialState)
                 }
        
               
             })
                .catch(err=>console.log(err))
            }
            
    return (
      
                 <div className="form-app1">
         <h2 >Sign In</h2>
<form className = "form" onSubmit={handleSubmit}>

    <input type="email" name = "email" placeholder ="Email Address" value={state.email}  onChange={handleChange}/>
    <input type="password" name = "password" placeholder ="Password" value={state.password}  onChange={handleChange}/>

    <button type = "submit" className = "contactBtn sm" disabled={mutationLoading || validateForm()}>Submit</button>
    {mutationLoading && <p>Loading...</p>}
    {mutationError && <p>Error : Please try again {mutationError.message}</p>}
</form>
        </div>
    )
}

export default Signin