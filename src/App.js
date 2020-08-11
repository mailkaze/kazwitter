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
import SearchField from './components/searchField';

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const showSignup = useSelector(state => state.showSignup)
  const showLogin = useSelector(state => state.showLogin)
  const showSearch = useSelector(state => state.showSearch)
  const showNewPost = useSelector(state => state.showNewPost)
  
  useEffect(() => {
    auth.onAuthStateChanged(function(userCredential) {
      console.log('Usuario actual:', userCredential)
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
      { showNewPost && user !== null && <NewPost /> }
      { showSignup && <Signup /> }
      { showLogin && <Login /> }
      { user === null && <p className="no-user">Log in for read an write Kazweets!</p> }
      { user !== null && <Timeline /> }
      { !showNewPost && user !== null && <AddButton /> }
      { showSearch && <SearchField />}
    </div>
  );
}

export default App;
