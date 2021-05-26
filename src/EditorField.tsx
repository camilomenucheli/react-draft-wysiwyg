import { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const EditorField = () => {
  const [ editorState, setEditorState ] = useState(EditorState.createEmpty())

  const onEditorStateChange = (editorState: any) => setEditorState(editorState)

  const print = () =>
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))

  function uploadCallback(file: any) {
    return new Promise((resolve, reject) => {
      if (!file) resolve(null)
      
      const reader = new FileReader()
      
      reader.readAsDataURL(file)
        
      reader.onload = () => resolve({ data: { link: reader.result } })
      reader.onerror = error => reject(error)
    })
  }

  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          image: {
            previewImage: true,
            urlEnabled: true,
            uploadEnabled: true,
            uploadCallback: uploadCallback
          }
        }}
      />
      <button onClick={() => print()}>Teste</button>
    </div>
  )
}

export { EditorField }
