import React from 'react';
import { gql, useMutation } from "@apollo/client";
const MAKE_POST =gql(`
mutation MAKEPOST($body:JSON!,$title:String,$user:ID){
  makePost(body:$body,title:$title,user:$user){
    id
    body
  }
}
`)

export default function MakePost({post,title,user}) {
  console.log(post,title,user)
    const initialState = {}
    const [body,setBody] = React.useState(initialState)
    React.useEffect(()=>{
        setBody(JSON.stringify(post))
    },[post])
    const[makePost,{loading: mutationLoading,error: mutationError,...data}] =useMutation(MAKE_POST)
    function handleClick(){

makePost({variables:{body,title,user}})
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
