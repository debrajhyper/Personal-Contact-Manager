import React, { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import { Form } from 'react-bootstrap';

const FormNote = ({ description, cName, functionChange, hasTouched, hasError }) => {
  const [text, setText] = useState('');
  const editorRef = useRef(null);

  return (
    <Form.Group className={`form-input ${cName}`} controlId="description">
      <Editor
        name="description"
        apiKey={process.env.REACT_APP_TINYMCE_EDITOR_API_KEY}
        id="Note"
        type={text}
        value={description}
        className={hasTouched && hasError ? 'hasError' : (description !== '' ? 'noError' : '')}
        onInit={(evt, editor) => {
          editorRef.current = editor;
          setText(editor.getContent({ format: 'html' }));
        }}
        onEditorChange={(newValue, editor) => {
          functionChange(newValue);
          setText(editor.getContent({ format: 'html' }));
        }}
        init={{
          height: 400,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </Form.Group>
  )
}

export default FormNote