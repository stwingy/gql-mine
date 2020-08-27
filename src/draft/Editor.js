import React, { Component } from 'react';
import { EditorState,convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html'

class ControlledEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
        <div>
            <button onClick={()=>console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())))}>click</button>
             <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={this.onEditorStateChange}
      />
        </div>
   
    )
  }
}
export default ControlledEditor
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