import React, { useState } from 'react';
import MakePost from './MakePost';
import GetOnePost from './GetOnePost';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useAuthState, useAuthDispatch } from '../AuthContext';
// import { gql, useMutation } from '@apollo/client';
// const MAKE_POST = gql(`
// mutation MAKEPOST($body:JSON!){
//   makePost(body:$body){
//     id
//     body
//   }
// }
// `);

const ControlledEditor = ({ hidePost }) => {
	const [ state, setState ] = useState({ editorState: EditorState.createEmpty() });
	const [ title, setTitle ] = useState('');
	const { isAuth, user } = useAuthState();
	React.useEffect(
		() => {
			console.log('useruser', user);
		},
		[ user ]
	);

	const onEditorStateChange = (editorState) => {
		setState({
			editorState
		});
	};
	const handleTitle = (e) => {
		setTitle(e.target.value);
	};
	const { editorState } = state;

	return (
		<div>
			<form style={{ marginTop: '1em' }}>
				<input type="text" name="title" placeholder="Title" onChange={handleTitle} value={title} />
				<div style={{ maxHeight: '60vh', marginTop: '2em' }}>
					<Editor
						editorState={editorState}
						wrapperClassName="demo-wrapper"
						editorClassName="demo-editor"
						onEditorStateChange={onEditorStateChange}
					/>
				</div>
			</form>
			<MakePost
				post={convertToRaw(editorState.getCurrentContent())}
				title={title}
				user={user}
				hidePost={hidePost}
			/>
		</div>
	);
};
export default ControlledEditor;
/*
So how’s the code look? Going into MongoDB looks something like this:

import { convertToRaw } from 'draft-js';
import { editorState } = this.state;

const rawState = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
Then when we pull the data out of MongoDB:

import { convertFromRaw, EditorState } from 'draft-js';

this.state.editorState = EditorState.createWithContent(
  convertFromRaw(JSON.parse(this.props.rawState))
);
*/
