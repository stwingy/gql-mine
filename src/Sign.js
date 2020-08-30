import React from 'react'
import Signin from './Signin'
import Signup from './Signup'
import Logout from './Logout'
import {useAuthState, useAuthDispatch} from './AuthContext'
function Sign() {
    const [vis,setVis]=React.useState()

    const {isAuth} = useAuthState()
    const dispatch = useAuthDispatch()
    React.useEffect(()=>{
isAuth?setVis(false):setVis(true)
    },[isAuth])
  //if(isAuth) return <Logout/>
    return (
        <>
        <div className = {`sign-holder ${!vis?"invis":""}`}>
            <Signin/>
            <Signup/>
           
            
        </div>
        <div className = {`${vis ?"invis":"lm"}`}>
        <Logout/>
        </div>
        </>
    )
}

export default Sign
