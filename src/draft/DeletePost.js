import React from 'react'
import {useAuthState} from '../AuthContext'
import { gql, useMutation } from "@apollo/client";
const DELETE_POST =gql`mutation DeletePost($id:ID!,$user:ID!){
    deletePost(id:$id,user:$user){
      postDate
     
    }
  }`
function DeletePost({id,refetch}) {
    const {user}=useAuthState()
    const [deletePost, { loading: mutationLoading, error: mutationError }] = useMutation(DELETE_POST);
    const handleClick =()=>{
        console.log(id,user)
        deletePost({ variables: { id:id,user:user.id } })
        .then(()=>refetch())
    }
    return (
        <>
        <button onClick={handleClick}>Delete</button>
        {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error :( Please try again</p>}
        </>
    )
}

export default DeletePost
