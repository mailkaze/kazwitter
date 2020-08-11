import React from 'react'
import styled from 'styled-components'

const PostStyled = styled.div`
  width: 90%;
  margin: auto;
  padding: 8px;
  margin-bottom: 6px;
  background: white;
  border-radius: 8px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, .3);
  position: relative;
  i {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
  }
  p {
    margin: 0;
  }
  p:nth-child(2) {
    font-weight: 500;
  }
  p:nth-child(4) {
    margin-top: 8px;
    font-size: .7em;
    text-align: right;
  }
`

export default function Post(props) {
  const date = new Date(props.date)
  return (
    <PostStyled>
      <i className="fas fa-ellipsis-v"></i>
      <p>{props.author}</p>
      <p>{props.content}</p>
      <p>{date.toLocaleString()}</p>
      {/* <p>Id: {props.id}</p> */}
      {/* <p>Author Id: {props.authorId}</p> */}
    </PostStyled>
  )
}
