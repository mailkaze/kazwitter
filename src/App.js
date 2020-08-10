import React, { useEffect } from 'react';
import Navbar from './components/navbar';
import Signup from './components/signup';
import { useSelector } from 'react-redux'
import Login from './components/login';
import AddButton from './components/addButton';
import NewPost from './components/newPost';
import Timeline from './components/timeline';

function App() {
  const user = useSelector(state => state.user)
  const showSignup = useSelector(state => state.showSignup)
  const showLogin = useSelector(state => state.showLogin)
  const showNewPost = useSelector(state => state.showNewPost)
  
  useEffect(() => {
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
