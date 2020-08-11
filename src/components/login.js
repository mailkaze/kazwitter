import React, { useState } from 'react'
import styled from 'styled-components'
import { auth } from '../firebase'
import { useDispatch } from 'react-redux'
import { setShowLogin } from '../redux/actions'

const LoginStyled = styled.div`
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
  h5 {
    margin: 0;
  }
  input {
    height: 1.8em;
    margin-top: 7px;
    border-style: none;
    border: 1px solid grey;
    border-radius: 3px;
    padding: 8px 14px;
  }
  button {
    border-style: none;
    background: #0097e6;
    color: white;
    padding: 12px 0;
    margin-top: 7px;
    border-radius: 3px;
    cursor: pointer;
  }
`

export default function Login() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function onChange(e) {
    switch (e.target.id) {
      case 'email':
        setEmail(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      default: break
    }
  }

  function onSubmit(e) {
    e.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
    .then(async userCredential => {
      dispatch(setShowLogin())
    })
  }

  return (
    <LoginStyled>
      <i className="fas fa-times" onClick={() => dispatch(setShowLogin())} ></i>
      <form onSubmit={onSubmit} >
      <h5>Log in:</h5>
        <input 
          type="email" 
          name="email" 
          id="email" 
          placeholder="e-Mail ..." 
          onChange={onChange}
          value={email}
          required 
        />
        <input 
          type="password" 
          name="password" 
          id="password" 
          placeholder="Password ..." 
          onChange={onChange}
          value={password}
          required 
        />
        
        <button type="submit">Login</button>
      </form>
    </LoginStyled>
  )
}
