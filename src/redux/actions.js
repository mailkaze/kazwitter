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

export function setUserId(userId) {
  return {
    type: 'SET_USER_ID',
    payload: userId
  }
}