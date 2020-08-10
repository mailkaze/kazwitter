import { createStore } from 'redux'
import reducer from './reducers'

const initialState = {
  showSignup: false,
  showLogin: false,
  user: null,
  showNewPost: false,
}

export default createStore(reducer, initialState)