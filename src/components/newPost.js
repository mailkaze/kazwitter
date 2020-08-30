import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { setShowNewPost } from '../redux/actions'
import { db, storage } from '../firebase'

const NewPostStyled = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, .3);
  padding: 12px 20px;
  position: relative;
  i {
    position: absolute;
    top: 12px;
    right: 20px;
    cursor: pointer;
  }
  form {
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 80%;
  }
  h3 {
    margin: 0;
  }
  textarea {
    height: 6em;
    margin: 7px 0;
    border-style: none;
    border: 1px solid grey;
    border-radius: 3px;
    padding: 8px 14px;
  }
  .button {
    margin-top: 7px;
    border-style: none;
    background: #0097e6;
    color: white;
    padding: 12px 0;
    border-radius: 3px;
    cursor: pointer;
  }
`

export default function NewPost() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [content, setContent] = useState('')
  const [file, setFile] = useState('')
  const fileID = Date.now()

  async function handleSubmit(e) {
    e.preventDefault()
    const post = {
      userId: user.uid,
      content: content,
      imageID: file !== '' ? fileID : '',
      date: Date.now()
    }
    await db.collection('posts').doc().set(post)
    if (file !== '') {uploadPicture()}
    setContent('')
    dispatch(setShowNewPost())
  }

  function handleChange(e) {
    setContent(e.target.value)
  }

  function processImage(e) {
    setFile(e.target.files[0])
  }

  function uploadPicture() {
    const storageRef = storage.ref()
    const profilePicRef = storageRef.child(`${fileID}.jpg`)
    profilePicRef.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
  }
  
  return (
    <NewPostStyled>
      <i className="fas fa-times" onClick={() => dispatch(setShowNewPost())}></i>
      <form onSubmit={handleSubmit}>
        <h3>New post:</h3>
        <textarea name="content" id="content" required 
          placeholder="¿Qué estás pensando?" onChange={handleChange}
          value={content} ></textarea>
        <label htmlFor="uploadPic">add an image:</label>
        <input type="file" name="uploadPic" id="uploadPic" multiple={false} onChange={processImage} accept="image/*" />
        <input type="submit" className="button" value="Enviar"/>
      </form>
    </NewPostStyled>
  )
}
