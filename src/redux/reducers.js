export default function reducer(state, action) {
  switch(action.type) {
    case 'SHOW_SIGNUP':
      return {...state, showSignup: !state.showSignup}
    case 'SHOW_LOGIN':
      return {...state, showLogin: !state.showLogin}
    case 'SET_USER':
      return {...state, user: action.payload}
    case 'SET_SHOW_NEW_POST':
      return {...state, showNewPost: !state.showNewPost}
    default:
      return state
  }
}