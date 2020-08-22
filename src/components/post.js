import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

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
  .options {
    position: absolute;
    right: 18px;
    background: white;
    padding: 5px;
    font-size: .8em;
    width: 80px;
    height: 50px;
    border-radius: 5px;
    box-shadow: 1px 1px 2px 1px rgba(0,0,0,.3);
  }
  p {
    margin: 0;
  }
  .author {
    font-weight: 500;
  }
  .date {
    margin-top: 8px;
    font-size: .7em;
    text-align: right;
  }
`

export default function Post(props) {
  const user = useSelector( state => state.user)
  const [showOptions, setShowOptions] = useState(false)
  const date = new Date(props.date)
  return (
    <PostStyled>
      <i className="fas fa-ellipsis-v" onClick={() => setShowOptions(!showOptions)}></i>
      {
        showOptions && (
          <div className="options">
            <p className="option">
              {
                user.uid !== props.authorId && (
                  user.following.includes(props.authorId) ? "Unfollow" : "Follow"
                )
                
              }</p>
          </div>
        )
      }

      <p className="author">{props.author}</p>
      <p className="content">{props.content}</p>
      <p className="date">{date.toLocaleString()}</p>
      {/* <p>Id: {props.id}</p> */}
      {/* <p>Author Id: {props.authorId}</p> */}
    </PostStyled>
  )
}
