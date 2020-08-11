import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { setShowSearch } from '../redux/actions'

const SearchFieldStyled = styled.div`
  position: absolute;
  top: 40px;
  left: 4vw;
  width: 80%;
  margin: auto;
  margin-top: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, .3);
  padding: 12px 20px;
  i {
    cursor: pointer;
  }
  input {
    height: 1.8em;
    margin-top: 7px;
    border-style: none;
    border: 1px solid grey;
    border-radius: 3px;
    padding: 8px 14px;
  }
`

export default function SearchField() {
  const dispatch = useDispatch();
  return (
    <SearchFieldStyled>
      <i className="fas fa-times" onClick={() => dispatch(setShowSearch())}></i>
      <input type="text"/>
      <i className="fas fa-search"></i>
    </SearchFieldStyled>
  )
}
