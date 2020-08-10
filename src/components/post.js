import React from 'react'
import styled from 'styled-components'

const PostStyled = styled.div`
  border: 1px solid black;
  margin: 3px;
  p {
    margin: 0 0 0 3px;
  }
`

export default function Post(props) {
  return (
    <PostStyled>
      <p>Author: {props.author}</p>
      <p>post: {props.content}</p>
      <p>date: {props.date}</p>
      <p>Id: {props.id}</p>
      <p>Author Id: {props.authorId}</p>
    </PostStyled>
  )
}
