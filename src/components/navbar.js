import React from 'react'
import styled from 'styled-components'
import { auth } from '../firebase'
import { useSelector, useDispatch } from 'react-redux'
import { setShowSignup, setShowLogin, setUser } from '../redux/actions'

const NavbarStyled = styled.nav`
  li {
    list-style: none;
    display: inline-block;
    margin: 0 5px;
    cursor: pointer;
  }
`

export default function Navbar() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  function logOut() {
    if (window.confirm('Are you sure you want to log out?')){
      auth.signOut()
      .then(() => {
        dispatch(setUser(null))
        console.log('sign out')
      })
    }
  }
  return (
    <NavbarStyled>
      <ul>
        { user === null && <li onClick={() => dispatch(setShowSignup())}>Sign up</li> }
        { user === null && <li onClick={() => dispatch(setShowLogin())}>Log in</li> }
        { user !== null && <li onClick={logOut}>Log out</li> }
        { user !== null && <li>Settings</li> }
      </ul>
    </NavbarStyled>
  )
}