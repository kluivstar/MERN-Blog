import React, { useEffect, useState } from 'react'
import Editor from '../Editor'
import { Navigate, useParams } from 'react-router-dom'

const EditPost = () => {
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        fetch('http://localhost:4000/post/' +id)
        .then(res => {
            res.json().then(postInfo => {
                setTitle(postInfo.title)
                setContent(postInfo.content)
                setSummary(postInfo.summary)
            })
        })
    },[])
    const UploadPost = async(e) => {
        e.preventDefault()
        // This line creates a new FormData object named data. FormData is used to construct a set of key/value pairs representing form fields and their values, which can be easily sent using the fetch API or an XMLHttpRequest.
        const data = new FormData()

        // Each data.set() call adds a new entry to the FormData object:
        // Title: The value of the title variable is set under the key 'title'.
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('id', id)
        if(files?.[0]){
            data.set('file', files?.[0])
        }
        const res = await fetch('http://localhost:4000/post', {
          method: 'PUT',
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
    <form onSubmit={UploadPost}>
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
        <button class="">Upload post</button>
    </form>
  )
}

export default EditPost