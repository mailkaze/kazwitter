import React, { useState } from 'react'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import { useDispatch } from 'react-redux'
import { setShowSignup } from '../redux/actions'

const SignupStyled = styled.div`
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
    // TODO: hay que incluir la subida de imagen de perfil obligatoria
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
    })
    } else {
      setError(true)
    }

  }
  return (
    <SignupStyled>
      <i className="fas fa-times" onClick={() => dispatch(setShowSignup())} ></i>
      <form onSubmit={onSubmit} >
      <h5>Sign Up Form:</h5>
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
