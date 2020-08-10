import React, { useEffect } from 'react';
import Navbar from './components/navbar';
import Signup from './components/signup';
import { useSelector, useDispatch } from 'react-redux'
import Login from './components/login';
import AddButton from './components/addButton';
import NewPost from './components/newPost';
import Timeline from './components/timeline';
import { auth, db } from './firebase'
import { setUser } from './redux/actions'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const showSignup = useSelector(state => state.showSignup)
  const showLogin = useSelector(state => state.showLogin)
  const showNewPost = useSelector(state => state.showNewPost)
  
  useEffect(() => {
    auth.onAuthStateChanged(function(userCredential) {
      console.log('se activó el evento de cambio de usuario con esto:', userCredential)
      if (userCredential != null) {
        db.collection('users').doc(userCredential.uid).get()
        .then(function(doc) {
          if (doc.exists) {
            dispatch(setUser({...doc.data(), uid: userCredential.uid}))
          }
        })
      } else {
        dispatch(setUser(null))
      }
  });
  }, [])

  return (
    <div className="App">
      <Navbar />
      { !showNewPost && user !== null && <AddButton /> }
      { showNewPost && user !== null && <NewPost /> }
      { showSignup && <Signup /> }
      { showLogin && <Login /> }
      { user === null && <p>Log in for read an write Kazweets!</p> }
      { user !== null && <Timeline /> }
      
    </div>
  );
}

export default App;
