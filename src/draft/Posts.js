import React from 'react';
import Modal from '../modal/Modal'
import Editor from '../draft/Editor.js'
import './Posts.css';
import { gql, useQuery } from '@apollo/client';
import draftToHtml from 'draftjs-to-html';
const parse = require('html-react-parser');
const ALL_POSTS = gql`
	query AllPosts {
		allPosts {
			body
			title
			id
			postDate
			user {
				name
				role
				joinDate
			}
		}
	}
`;

function Posts() {
    const [showPost,setShowPost] =React.useState(false)
    function handleClick(){
        setShowPost(true)
    }
    function hidePost(){
        setShowPost(false)
    }
	const { data, loading, error } = useQuery(ALL_POSTS);
	if (loading) return <div>...loading</div>;
	if (error) return <div>error</div>;
	console.log(data.allPosts);
	return (
		<div>
            <Modal show={showPost} onCancel ={hidePost}><Editor/></Modal>
            <button style ={{marginTop:"5em"}}onClick ={handleClick}>POST</button>
			{data.allPosts.map((post) => (
				<div className="postsholder" key={post.id}>
					<h2>{post.title}</h2>
					<div>
						<div>{parse(draftToHtml(JSON.parse(post.body)))}
						{post.user.name}
						{new Date(+post.postDate).toLocaleString()}</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default Posts;
//.slice(0, Date(post.postDate).indexOf(':') + 3)