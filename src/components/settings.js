import React from 'react'
import styled from 'styled-components'
import { storage } from '../firebase'
import { useSelector } from 'react-redux'

const SettingsStyled = styled.div`
width: 80%;
  margin: auto;
  margin-top: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, .3);
  padding: 12px 20px;
  position: relative;
`
export default function Settings() {
  const user = useSelector(state => state.user)

  function uploadPicture(e) {
    const storageRef = storage.ref()
    const profilePicRef = storageRef.child(`${user.uid}.jpg`)
    const file = e.target.files[0]
    profilePicRef.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
  }
  return (
    <SettingsStyled>
      <label htmlFor="uploadPic">Update your profile picture:</label>
      <input type="file" name="uploadPic" id="uploadPic" multiple={false} onChange={uploadPicture} accept="image/*" />
      <p>Change password</p>
    </SettingsStyled>
  )
}
