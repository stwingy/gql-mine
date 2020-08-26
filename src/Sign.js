import React from 'react'
import Signin from './Signin'
import Signup from './Signup'
import Logout from './Logout'
import {useAuthState, useAuthDispatch} from './AuthContext'
function Sign() {
    const {isAuth} = useAuthState()
    const dispatch = useAuthDispatch()
  //if(isAuth) return <Logout/>
    return (
        <>
        <div className = {`sign-holder ${isAuth?"invis":""}`}>
            <Signin/>
            <Signup/>
           
            
        </div>
        <div className = {`${!isAuth ?"invis":"lm"}`}>
        <Logout/>
        </div>
        </>
    )
}

export default Sign
