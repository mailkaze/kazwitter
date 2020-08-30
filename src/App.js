import React, { useEffect } from 'react';
import Navbar from './components/navbar';
import Signup from './components/signup';
import { useSelector, useDispatch } from 'react-redux'
import Login from './components/login';
import AddButton from './components/addButton';
import NewPost from './components/newPost';
import Timeline from './components/timeline';
import { auth, db, storage } from './firebase'
import { setUser } from './redux/actions'
import SearchField from './components/searchField';
import Settings from './components/settings';

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const showSignup = useSelector(state => state.showSignup)
  const showLogin = useSelector(state => state.showLogin)
  const showSearch = useSelector(state => state.showSearch)
  const showNewPost = useSelector(state => state.showNewPost)
  const showSettings = useSelector(state => state.showSettings)
  
  async function getProfilePic(uid) {
    var pathReference = storage.ref(`${uid}.jpg`)
    let pictureURL = ''
    await pathReference.getDownloadURL().then(function(url) {
      pictureURL = url
    })
    .catch(function(error) {
      pictureURL = 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg'
    })
    return pictureURL
  }

  useEffect(() => {
    auth.onAuthStateChanged(function(userCredential) {
      if (userCredential != null) {
        db.collection('users').doc(userCredential.uid).get()
        .then(async function(doc) {
          if (doc.exists) {
            const pictureURL = await getProfilePic(userCredential.uid)
            dispatch(setUser({...doc.data(), uid: userCredential.uid, pictureURL: pictureURL}))
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
      { showSettings && <Settings />}
      { user === null && <p className="no-user">Log in for read an write Kazweets!</p> }
      { user !== null && <Timeline /> }
      { !showNewPost && user !== null && <AddButton /> }
      { showSearch && <SearchField />}
    </div>
  );
}

export default App;
