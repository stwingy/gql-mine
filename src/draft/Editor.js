import React, { useState } from 'react';
import MakePost from './MakePost'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
// import { gql, useMutation } from '@apollo/client';
// const MAKE_POST = gql(`
// mutation MAKEPOST($body:JSON!){
//   makePost(body:$body){
//     id
//     body
//   }
// }
// `);

const ControlledEditor = () => {
	const [ state, setState ] = useState({ editorState: EditorState.createEmpty() });

	const onEditorStateChange = (editorState) => {
		setState({
			editorState
		});
	};

  const { editorState } = state;
  const handleClick=()=>{
  console.log ( JSON.stringify(convertToRaw(editorState.getCurrentContent())))
  }
	return (
		<div>
		
			<Editor
				editorState={editorState}
				wrapperClassName="demo-wrapper"
				editorClassName="demo-editor"
				onEditorStateChange={onEditorStateChange}
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
