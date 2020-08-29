import { createStore } from 'redux'
import reducer from './reducers'

const initialState = {
  showSignup: false,
  showLogin: false,
  showSettings: false,
  user: null,
  showNewPost: false,
  showSearch: false,
  search: '',
}

export default createStore(reducer, initialState)