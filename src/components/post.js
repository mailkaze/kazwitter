import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/actions'
import { db, storage } from '../firebase'

const PostStyled = styled.div`
  width: 90%;
  margin: auto;
  padding: 8px;
  margin-bottom: 6px;
  background: white;
  border-radius: 8px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, .3);
  position: relative;
  i {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
  }
  .options {
    position: absolute;
    right: 18px;
    background: white;
    padding: 5px;
    font-size: .8em;
    width: 80px;
    height: 50px;
    border-radius: 5px;
    box-shadow: 1px 1px 2px 1px rgba(0,0,0,.3);
  }
  .option {
    cursor: pointer;
  }
  p {
    margin: 0;
  }
  .author {
    font-weight: 500;
    display: flex;
    align-items: center;
  }
  .profile {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid white;
  }
  .content {
    margin-left: 40px;
  }
  .date {
    margin-top: 8px;
    font-size: .7em;
    text-align: right;
  }
`

export default function Post(props) {
  const dispatch = useDispatch()
  const user = useSelector( state => state.user)
  const [showOptions, setShowOptions] = useState(false)
  const [profilePic, setProfilePic] = useState('https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg')
  const date = new Date(props.date)

  function handleFollow() {
    if (user.following.includes(props.authorId)) {
      if (window.confirm(`Unfollow ${props.author}?`)) {
        const following = user.following.filter(f => f !== props.authorId)
        dispatch(setUser({...user, following: following}))
      }
    } else {
      dispatch(setUser({...user, following: [...user.following, props.authorId]}))
    }
  }

  useEffect(() => {
    db.collection('users').doc(user.uid).update({following: user.following})
  }, [user])

  async function getProfilePic() {
    var pathReference = storage.ref(`${props.authorId}.jpg`)
    let pictureURL = 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg'
    await pathReference.getDownloadURL().then(function(url) {
      pictureURL = url
    })
    setProfilePic(pictureURL)
  }
  
  useEffect(() => {
    getProfilePic()
  }, [])

  return (
    <PostStyled>
      <i className="fas fa-ellipsis-v" onClick={() => setShowOptions(!showOptions)}></i>
      {showOptions && (
        <div className="options">
          <p className="option" onClick={handleFollow}>
            {user.uid !== props.authorId && (
              user.following.includes(props.authorId) ? "Unfollow" : "Follow"
            )}
          </p>
        </div>
      )}
      <p className="author">
        <img src={profilePic} alt="profile pic" className="profile"/>
        {props.author}</p>
      <p className="content">{props.content}</p>
      {/* TODO: { props.hasImage && <img src={getImage} alt=""/> } */}
      <p className="date">{date.toLocaleString()}</p>
      {/* <p>Id: {props.id}</p> */}
    </PostStyled>
  )
}
