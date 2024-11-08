import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Navigate } from 'react-router-dom'

const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext)

    async function login(ev){
        ev.preventDefault()
        // Fetch request
        const res = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        })
        if(res.ok){
            res.json().then(userInfo => {
                setUserInfo(userInfo)
                setRedirect(true)
            })
        }else {
            alert('Wrong credentials')
        }
        
    }
    if(redirect) {
        return <Navigate to={"/"}/>
    }
    return (
        <form className='login' onSubmit={login}>
            <h1 className="">Sign In</h1>
            <input type='text' 
            placeholder='username' 
            value={username}
            onChange={ev => setUsername(ev.target.value)}
            />
            <input type='password' 
            placeholder='password' 
            value={password}
            onChange={ev => setPassword(ev.target.value)}
            />
            <button type="" className="">Sign in</button>
        </form>
    )
}

export default LoginPage