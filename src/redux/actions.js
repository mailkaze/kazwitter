export function setShowSignup() {
  return {
    type: 'SHOW_SIGNUP'
  }
}

export function setShowLogin() {
  return {
    type: 'SHOW_LOGIN'
  }
}

export function setUser(user) {
  return {
    type: 'SET_USER',
    payload: user
  }
}

export function setShowNewPost() {
  return {
    type: 'SET_SHOW_NEW_POST',
  }
}

export function setShowSearch() {
  return {
    type: 'SET_SHOW_SEARCH',
  }
}