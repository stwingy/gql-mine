import React from 'react';
import { gql, useMutation } from "@apollo/client";
const MAKE_POST =gql(`
mutation MakePost($body:JSON!,$title:String,$user:ID){
  makePost(body:$body,title:$title,user:$user){
    body
    title
    id
   user{
    name
    email
    joinDate
  }
  }

  
}
`)

export default function MakePost({post,title,user,hidePost}) {
  console.log(post,title,user)
    const initialState = {}
    const [body,setBody] = React.useState(initialState)
    React.useEffect(()=>{
        setBody(JSON.stringify(post))
    },[post])
    const[makePost,{loading: mutationLoading,error: mutationError,...data}] =useMutation(MAKE_POST)
    function handleClick(){
console.log("hc",typeof user,body)
makePost({variables:{body,title,user:user.id}})
.then(({data})=>{
console.log(data)
hidePost()
}).catch(e=>console.log(e))
    }
  return (
    <>
    <button onClick ={handleClick}>Make Post</button>
    </>
  );
}
