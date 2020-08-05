export default function reducer(state, action) {
  switch(action.type) {
    case 'SHOW_SIGNUP':
      return {...state, showSignup: !state.showSignup}
    case 'SHOW_LOGIN':
      return {...state, showLogin: !state.showLogin}
    case 'SET_USER_ID':
      return {...state, userId: action.payload}
    default:
      return state
  }
}