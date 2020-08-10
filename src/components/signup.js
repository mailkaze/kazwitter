import React, { useState } from 'react'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import { useDispatch } from 'react-redux'
import { setShowSignup } from '../redux/actions'

const SignupStyled = styled.div`
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

export default function Signup() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState(false)
  const [username, setUsername] = useState('')

  function onChange(e) {
    switch (e.target.id) {
      case 'username':
        setUsername(e.target.value)
        break
      case 'email':
        setEmail(e.target.value)
        break
      case 'password1':
        setPassword1(e.target.value)
        break
      case 'password2':
        setPassword2(e.target.value)
        break
      default: break
    }
  }

   function onSubmit (e) {
    e.preventDefault()
    if (password1 === password2) {
    auth.createUserWithEmailAndPassword(email, password1)
    .then( async userCredential => {
      setError(false) 
      setEmail('')
      setPassword1('')
      setPassword2('')
      dispatch(setShowSignup())
      const newUser = {
        username: username,
        registered: Date.now(),
        avatar: '',
        following: [userCredential.user.uid]
      }
      await db.collection('users').doc(userCredential.user.uid).set(newUser)
      console.log('sign up with userCredential: ', userCredential.user.uid)
    })
    } else {
      setError(true)
    }

  }
  return (
    <SignupStyled>
      <h5>Sign In Form:</h5>
      <form onSubmit={onSubmit} >
        <input 
          type="text"
          name="username"
          id="username"
          placeholder="Username ..."
          onChange={onChange}
          value={username}
          required 
        />
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
          name="password1" 
          id="password1" 
          placeholder="Password ..." 
          onChange={onChange}
          value={password1}
          required 
        />
        <input 
          type="password" 
          name="password2" 
          id="password2" 
          placeholder="Repeat your password ..." 
          onChange={onChange}
          value={password2}
          required 
        />
        <button type="submit">Sign Up</button>
      </form>
      {
        error && <p>*You must write the same password in both fields.</p>
      }
    </SignupStyled>
  )
}
