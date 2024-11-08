import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    //const [redirect, setRedirect] = useState(false)
    //const {setUserInfo} = useContext(UserContext)

    // aysnc function makes fetchs the register api, calling the aip. The result is then sent as a response to user/used to populate components JSX
    async function register(ev){
        ev.preventDefault()
        const res = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'}
        })
        if(res.status === 200){
            alert("Sign up successful")
        }else {
            alert('Sign up failed')
        }
    }
    return (
        // form collects user input, saves to corresponding states using onChange Event handler
        <form className='register' onSubmit={register}>
            <h1 className="">Sign Up</h1>
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
                <button className="reg_button">Sign up</button>
            </form>
    )
    }

export default Register