import React from 'react';
import Modal from '../modal/Modal';
import Editor from '../draft/Editor.js';
import './Posts.css';
import { gql, useQuery } from '@apollo/client';
import draftToHtml from 'draftjs-to-html';
import { useAuthState } from '../AuthContext';

import DeletePost from './DeletePost'
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
	const { isAuth } = useAuthState();
	const [ showPost, setShowPost ] = React.useState(false);
	function handleClick() {
		setShowPost(true);
	}
	function hidePost() {
		setShowPost(false);
		refetch();
	}
	const { data, loading, error, refetch } = useQuery(ALL_POSTS);
	if (loading) return <div>...loading</div>;
	if (error) return <div>error</div>;
	console.log(data.allPosts);
	return (
		<div>
			<Modal show={showPost} onCancel={hidePost}>
				<Editor hidePost={hidePost} />
			</Modal>
			<button disabled={!isAuth} style={{ marginTop: '10em' }} onClick={handleClick}>
				POST
			</button>
			{data.allPosts.map((post) => (
				<div className="postsholder" key={post.id}>
					<h3>{post.title}</h3>
					<div>
						<div>
							{parse(draftToHtml(JSON.parse(post.body)))}
							<p>
								Posted by
								<span className="s1">{` ${post.user.name} `}</span>
								At
								<span className="s2">{` ${new Date(+post.postDate).toLocaleString()}`}</span>
							</p>
							<DeletePost id={post.id} refetch={refetch} />
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default Posts;
//.slice(0, Date(post.postDate).indexOf(':') + 3)
