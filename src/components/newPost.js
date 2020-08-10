import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { setShowNewPost } from '../redux/actions'
import { db } from '../firebase'

const NewPostStyled = styled.div`
  float: left;
  border: 1px solid black;
  padding: 8px;
  span {
    cursor: pointer;
    display: block;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  input {
    margin-top: 5px;
    padding: 5px 10px
  }
`

export default function NewPost() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [content, setContent] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const post = {
      userId: user.uid,
      content: content,
      date: Date.now()
    }
    console.log(post)
    await db.collection('posts').doc().set(post)
    setContent('')
    dispatch(setShowNewPost())
  }
  function handleChange(e) {
    setContent(e.target.value)
  }
  
  return (
    <NewPostStyled>
      <h3>New post:</h3>
      <form onSubmit={handleSubmit}>
        <span onClick={() => dispatch(setShowNewPost())}>Cerrar</span>
        <textarea name="content" id="content" cols="30" rows="10" required 
          placeholder="¿Qué estás pensando?" onChange={handleChange}
          value={content} ></textarea>
        <input type="submit" value="Enviar"/>
      </form>
    </NewPostStyled>
  )
}
