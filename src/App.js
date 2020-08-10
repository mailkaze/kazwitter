import React, { useEffect } from 'react';
import Navbar from './components/navbar';
import Signup from './components/signup';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './redux/actions'
import { auth, db } from './firebase'
import Login from './components/login';
import AddButton from './components/addButton';
import NewPost from './components/newPost';
import Timeline from './components/timeline';

function App() {
  const user = useSelector(state => state.user)
  const showSignup = useSelector(state => state.showSignup)
  const showLogin = useSelector(state => state.showLogin)
  const showNewPost = useSelector(state => state.showNewPost)
  const dispatch = useDispatch()
  
  useEffect(() => {
    // console.log('ME LLAMAN JODER!!')
    // //escucha eventos de AUTH
    // auth.onAuthStateChanged(function(userCredential) {
    //   user !== null 
    //   ? 
    //   (db.collection('users').where('uid', '==', userCredential.user.uid).get()
    //   .then(function(querySnapshot) {
    //     console.log(querySnapshot)
    //     querySnapshot.forEach(function(doc) {
    //       dispatch(setUser(doc.data()))
    //     })
    //   }))
    //   : dispatch(setUser(null))
    // });

    user !== null ? console.log('Usuario actual:', user) : console.log('No hay usuario logeado.')
  }, [user])

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
