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
    function handleClick(){

    }
  return (
    <>
    <button onClick ={handleClick}>Make Post</button>
    </>
  );
}
