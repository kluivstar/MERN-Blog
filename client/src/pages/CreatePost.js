import ReactQuill from 'react-quill'
import React, { useState } from 'react'
import Editor from '../Editor'
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false)

    const createNewPost = async(e)=>{
      ///This line creates a new FormData object named data. FormData is used to construct a set of key/value pairs representing form fields and their values
        const data = new FormData()
        // Each data.set() call adds a new entry to the FormData object:
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('file', files[0])
        e.preventDefault()
        const res = await fetch('http://localhost:4000/post', {
          method: 'POST',
          body: data,
          credentials: 'include'
        })
        if(res.ok){
            setRedirect(true)
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }
  return (
    <form onSubmit={createNewPost}>
        <input 
        type="title" 
        placeholder="Title" 
        value={title} 
        onChange={e=> setTitle(e.target.value)}/>

        <input 
        type="summary" 
        placeholder="Summary" 
        value={summary} 
        onChange={e=> setSummary(e.target.value)}/>

        <input 
        type="file" 
        onChange={e=> setFiles(e.target.files)}/>

        <Editor value={content}
        onChange={setContent}/>
        <button class="">Create post</button>
    </form>
  )
}

export default CreatePost