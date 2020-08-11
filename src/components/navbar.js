import React from 'react'
import styled from 'styled-components'
import { auth } from '../firebase'
import { useSelector, useDispatch } from 'react-redux'
import { setShowSignup, setShowLogin, setShowSearch } from '../redux/actions'

const NavbarStyled = styled.nav`
  background: #0097e6;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .fa-twitter {
    margin-left: 16px;
    font-size: 2em;
  }
  ul {
    margin: 0;
    padding: 20px;
  }
  li {
    list-style: none;
    display: inline-block;
    margin: 0 5px;
    cursor: pointer;
    font-weight: 500;
  }
  fa-search {
    margin-right:3px;
    cursor: pointer;
  }
`

export default function Navbar() {
  const user = useSelector(state => state.user)
  const showSignup = useSelector(state => state.showSignup)
  const showLogin = useSelector(state => state.showLogin)
  const dispatch = useDispatch()

  function logOut() {
    if (window.confirm('Are you sure you want to log out?')){
      auth.signOut()
      .then(() => {
        console.log('sign out')
      })
    }
  }

  function onClickSignUp() {
    if (showLogin) dispatch(setShowLogin())
    dispatch(setShowSignup())
  }

  function onClickLogin() {
    if (showSignup) dispatch(setShowSignup())
    dispatch(setShowLogin())
  }

  return (
    <NavbarStyled>
      <i className="fab fa-twitter"></i>
      <ul>
        { user !== null && <i className="fas fa-search" onClick={() => dispatch(setShowSearch())}></i>}
        { user === null && <li onClick={onClickSignUp}>Sign up</li> }
        { user === null && <li onClick={onClickLogin}>Log in</li> }
        { user !== null && <li onClick={logOut}>Log out</li> }
        { user !== null && <li>Settings</li> }
      </ul>
    </NavbarStyled>
  )
}