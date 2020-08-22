import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { setShowSearch, setSearch } from '../redux/actions'

const SearchFieldStyled = styled.div`
  position: absolute;
  top: 40px;
  left: 4vw;
  width: 90%;
  margin: auto;
  margin-top: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, .3);
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  i {
    cursor: pointer;
    font-size:1.2em;
    margin-right: 8px;
  }
  input {
    margin-left: 8px;
    border: none;
    width: 80%;
    /* padding: 5px 8px 5px 8px; */
    font-size: 1.4em;
  }
  input:focus{
    outline: none;
  }
`

export default function SearchField() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('')

  function handleChange(e) {
    setSearchTerm(e.target.value)
  }

  function handleKey(e) {
    if (e.keyCode === 13) {
      if (searchTerm !== '') {
        dispatch(setSearch(searchTerm.trim()))
      }
    }
  }

  function handleClose() {
    dispatch(setShowSearch())
    setSearchTerm('')
    dispatch(setSearch(''))
  }

  return (
    <SearchFieldStyled>
      <input type="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyUp={handleKey}
        autoFocus
      />
      <i className="fas fa-times" 
        onClick={handleClose}
      ></i>
    </SearchFieldStyled>
  )
}
