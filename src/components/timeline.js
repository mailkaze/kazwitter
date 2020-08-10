import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { db } from '../firebase'
import { useSelector } from 'react-redux'
import Post from './post'

const TimelineStyled = styled.div`
  
`

export default function Timeline() {
  const user = useSelector(state => state.user)
  const [posts, setPosts] = useState([])

  function getPosts() {
    setPosts([])
    user.following.forEach( followed => {
      db.collection("posts").where("userId", "==", followed).get()
      .then(function(querySnapshot) {
        querySnapshot.forEach( async function(doc) {
          const data = doc.data();
          // Aquí recogerá el avatar del usuario cuando los haya
          // falta recolectar likes, retweets, si es respuesta y respuestas cuando los haya
          let author = {}
          await db.collection('users').doc(data.userId).get()
          .then(function(userData) {
            author = userData.data()
            console.log(author.username)
          })
          const postData = {
            id: doc.id,
            author: author.username,
            authorId: data.userId,
            content: data.content,
            date: data.date
          }
          setPosts(posts => [...posts, postData])
        });
      })    
    })
  }

  useEffect(() => {
    getPosts()
  }, [user])

  return (
    <TimelineStyled>
      <p onClick={getPosts} >Reload</p>
      {
        posts.map(post => (
          <Post 
            key={post.id}
            id={post.id}
            author={post.author}
            content={post.content}
            date={post.date}
            authorId={post.authorId}
          />
        ))
      }
    </TimelineStyled>
  )
}
