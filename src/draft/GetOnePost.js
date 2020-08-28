import React from 'react'
import { gql, useQuery } from "@apollo/client";
import { EditorState, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
var parse = require('html-react-parser');
 const GET_ONE_POST = gql`
query OnePost($id:ID!) {
   onePost(id:$id) {
      body
    }
}

`
function GetOnePost() {
    const { loading, error, data } = useQuery(GET_ONE_POST,{variables:{id:"5f48bbf08b8c370cb01fd273"}})
   let myVar
    //console.log(data.body.post)
    if (loading) return null;
    if (error) return `Error! ${error}`;
    if(data)myVar=draftToHtml(JSON.parse(data.onePost.body).post)
    console.log(typeof myVar)
    return (
        <div>
           {parse(myVar)}
        </div>
    )
}

export default GetOnePost
