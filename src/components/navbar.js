import React from 'react'
import styled from 'styled-components'
import { auth } from '../firebase'
import { useSelector, useDispatch } from 'react-redux'
import { setShowSignup, setShowLogin } from '../redux/actions'

const NavbarStyled = styled.nav`
  li {
    list-style: none;
    display: inline-block;
    margin: 0 5px;
    cursor: pointer;
  }
`

export default function Navbar() {
  const userId = useSelector(state => state.userId)
  const dispatch = useDispatch()

  function logOut() {
    if (window.confirm('Are you sure you want to log out?')){
      auth.signOut()
      .then(() => {
        console.log('sign out')
      })
    }
  }
  return (
    <NavbarStyled>
      <ul>
        { userId === null && <li onClick={() => dispatch(setShowSignup())}>Sign up</li> }
        { userId === null && <li onClick={() => dispatch(setShowLogin())}>Log in</li> }
        { userId !== null && <li onClick={logOut}>Log out</li> }
        { userId !== null && <li>Settings</li> }
      </ul>
    </NavbarStyled>
  )
}