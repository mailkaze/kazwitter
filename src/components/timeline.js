import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { db } from '../firebase'
import { useSelector } from 'react-redux'
import Post from './post'

const TimelineStyled = styled.div`
  .fa-redo-alt {
    display: block;
    text-align: center;
    margin: auto;
    color: #0097e6;
    padding: 10px;
    font-size: 1.4em;
    cursor: pointer;
  }
  .fa-redo-alt:hover {
    color: #00a8ff;
  }
`

export default function Timeline() {
  const user = useSelector(state => state.user)
  const search = useSelector(state => state.search)
  const [posts, setPosts] = useState([])

  function getPosts() {
    setPosts([])

    if (search !== '') {
      /* Esta función es horriblemente ineficiente, pide todos los posts de la base de datos y los comprueba 
      en local uno por uno, pero es que firebase no acepta búsquedas parciales en sus campos. */
      db.collection("posts").get()
      .then(function(querySnapshot) {
        querySnapshot.forEach( async function(doc) {
          const data = doc.data();
          let author = {}
          await db.collection('users').doc(data.userId).get()
          .then(function(userData) {
            author = userData.data()
          })
          if ( data.content.toLowerCase().includes(search.toLowerCase()) // busca en el contenido del post
          || author.username.toLowerCase().includes(search.toLowerCase()) ) { // busca en el nombre del autor
            const postData = {
              id: doc.id,
              author: author.username,
              authorId: data.userId,
              content: data.content,
              date: data.date
            }
            setPosts(posts => [...posts, postData])
          }
        })
      })
    } else {
      user.following.forEach( followed => {
        db.collection("posts").where("userId", "==", followed).get()
        .then(function(querySnapshot) {
          querySnapshot.forEach( async function(doc) {
            const data = doc.data();
            // falta recolectar likes, retweets, si es respuesta y respuestas cuando los haya
            let author = {}
            await db.collection('users').doc(data.userId).get()
            .then(function(userData) {
              author = userData.data()
            })
            const postData = {
              id: doc.id,
              author: author.username,
              authorId: data.userId,
              content: data.content,
              imageID: data.imageID,
              date: data.date
            }
            setPosts(posts => [...posts, postData])
          });
        })    
      })
    }
    

    
  }

  useEffect(() => {
    getPosts()
  }, [user, search])

  return (
    <TimelineStyled>
      <i className="fas fa-redo-alt" onClick={getPosts} ></i>
      {
        posts
        .sort((a, b) => b.date - a.date) // orden descendente por fecha
        .map(post => (
          <Post 
            key={post.id}
            id={post.id}
            author={post.author}
            content={post.content}
            imageID={post.imageID}
            date={post.date}
            authorId={post.authorId}
          />
        ))
      }
    </TimelineStyled>
  )
}
