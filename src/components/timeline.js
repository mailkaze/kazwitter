import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { db } from '../firebase'
import { useSelector } from 'react-redux'

const TimelineStyled = styled.div`

`

export default function Timeline() {
  const user = useSelector(state => state.user)
  const [posts, setPosts] = useState([])

  function getPosts() {
    user.following.forEach( followed => {
       db.collection("posts").where("userId", "==", followed).get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const data = doc.data();
          setPosts(posts => [...posts, {id: doc.id, data: data.content}])
        });
      })    
    })
  }

  useEffect(() => {
    getPosts()
  }, [user])

  return (
    <TimelineStyled>
      {
        //de momento solo mostramos los post propios
        posts.map(post => <p>ID: {post.id} <br /> Data: {post.data} </p> )
      }
    </TimelineStyled>
  )
}
