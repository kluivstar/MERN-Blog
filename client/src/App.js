import UserContextProvider from "./UserContext"
import {Route, Routes} from "react-router-dom";
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/Register'
import CreatePost from './pages/CreatePost.js'
import PostPage from './pages/PostPage'
import EditPost from './pages/EditPost'
import Layout from './Layout'
import IndexPage from './pages/IndexPage'

const App = () => {
  return (
    
<UserContextProvider> 
      <Routes >
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/create" element={<CreatePost/>}/>
          <Route path="/post/:id" element={<PostPage/>}/>
          <Route path="/edit/:id" element={<EditPost/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App