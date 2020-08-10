import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { setShowNewPost } from '../redux/actions'

const AddButtonStyled = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: lightblue;
  cursor: pointer;
  span {
    font-size: 30px;
    font-weight: 700;
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
