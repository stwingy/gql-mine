import React from 'react';
import { gql, useMutation } from "@apollo/client";
const MAKE_POST =gql(`
mutation MAKEPOST($body:JSON!){
  makePost(body:$body){
    id
    body
  }
}
`)

export default function MakePost(post) {
    const initialState = {}
    const [body,setBody] = React.useState(initialState)
    React.useEffect(()=>{
        setBody(JSON.stringify(post))
    },[post])
    const[makePost,{loading: mutationLoading,error: mutationError,...data}] =useMutation(MAKE_POST)
    function handleClick(){

makePost({variables:{body}})
.then(({data})=>{
console.log(data)
}).catch(e=>console.log(e))
    }
  return (
    <>
    <button onClick ={handleClick}>Make Post</button>
    </>
  );
}
