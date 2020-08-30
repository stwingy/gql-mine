import React from 'react'
import {gql,useQuery} from '@apollo/client'
import draftToHtml from 'draftjs-to-html';
const parse = require('html-react-parser');
const ALL_POSTS=gql`
query AllPosts{
    allPosts{
        body
        title
        user{
            name
            role
            joinDate
        }

    }
}
`
    
        
    
  

function Posts() {
    const {data,loading,error} =useQuery(ALL_POSTS)
    if(loading) return <div>...loading</div>
    if(error) return<div>error</div>
    console.log(data.allPosts)
    return (
        <div>
{
data.allPosts.map((p)=>

<div key ={p.id}>
    <h2>{p.title}</h2>
    <div>{parse(draftToHtml(JSON.parse(p.body)))}</div>
</div>)
        }
        </div>
        
        
    )
}

export default Posts
