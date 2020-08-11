import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { setShowNewPost } from '../redux/actions'

const AddButtonStyled = styled.div`
  position: fixed;
  float: inline-end;
  bottom: 3vh;
  right: 5vw;
  box-shadow: 1.2px 1.2px 3px rgba(2, 2, 5, .6);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #0097e6;
  cursor: pointer;
  transition: ease-in .1s;
  span {
    color: white;
    font-size: 34px;
    font-weight: 500;
  }
  &&:hover {
    transform:scale(1.1)
  }
`

export default function AddButton() {
  const dispatch = useDispatch()
  return (
    <AddButtonStyled onClick={() => dispatch(setShowNewPost())}>
      <span>+</span>
    </AddButtonStyled>
  )
}
