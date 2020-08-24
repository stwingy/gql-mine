import React from 'react'
import {isLoggedInVar} from './cache.ts'
import {useApolloClient} from '@apollo/client'
function Logout() {
    const client = useApolloClient()
    const handleClick =()=>{
localStorage.clear()
//client.cache.reset()
client.cache.gc()
isLoggedInVar(false)
    }
    return (
        <div>
            <button onClick = {handleClick}>Logout</button>
        </div>
    )
}

export default Logout
