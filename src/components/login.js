import React, { useState } from 'react'
import styled from 'styled-components'
import { auth } from '../firebase'
import { useDispatch } from 'react-redux'
import { setShowLogin } from '../redux/actions'

const LoginStyled = styled.div`
  border: 1px solid black;
  h5 {
    margin: 5px
  }
  form > * {
    display: block;
    margin: 5px;
  }
  p {
    color: red;
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
      <h5>Log in:</h5>
      <form onSubmit={onSubmit} >
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
