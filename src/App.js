import React, { useEffect } from 'react';
import Navbar from './components/navbar';
import Signup from './components/signup';
import { useSelector, useDispatch } from 'react-redux'
import { setUserId } from './redux/actions'
import { auth } from './firebase'
import Login from './components/login';

function App() {
  const userId = useSelector(state => state.userId)
  const showSignup = useSelector(state => state.showSignup)
  const showLogin = useSelector(state => state.showLogin)
  const dispatch = useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      dispatch(setUserId(user))
    });
    console.log(userId)
  }, [userId])

  return (
    <div className="App">
      <Navbar />
      { showSignup && <Signup /> }
      { showLogin && <Login /> }
    </div>
  );
}

export default App;
