import { createStore } from 'redux'
import reducer from './reducers'

const initialState = {
  showSignup: false,
  showLogin: false,
  userId: null,
}

export default createStore(reducer, initialState)