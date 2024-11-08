import '../App.css'
import Header from '../Header'
import Post from '../Post'
import {useEffect, useState} from "react";

const IndexPage = () => {
  const [posts, setPosts] = useState([])
  useEffect(()=> {
    fetch('http://localhost:4000/post').then(response => {
      response.json().then(posts => {
        setPosts(posts)
      })
    })
}, [])
  
  return (
    <div>
      {posts.length > 0 && posts.map(post => (
        <Post {...post}/>
      ))}
      
     
    </div>
  )
}

export default IndexPage