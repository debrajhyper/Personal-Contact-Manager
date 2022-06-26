import React, { useState, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';

import { Form } from 'react-bootstrap';

const FormNote = ({ description, cName, functionChange, hasTouched, hasError }) => {
  const editorRef = useRef(null);

  const [text, setText] = useState('');

  return (
    <Form.Group className={`form-input ${cName}`} controlId="description">
      <Editor
        name="description"
        apiKey="gdhpvh2ls6uy0c61y0hzy3sxpf1bzg5mpzexdely1mx6a5ag"
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
        // initialValue="<p>This is the initial content of the editor.</p>"
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
      {/* <pre>{text}</pre> */}
    </Form.Group>
  )
}

export default FormNote