import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import GoogleLogin from './GoogleLogin'
import Dashboard from './Dashboard'
import NotFoundPage from './NotFoundPage'
import {GoogleOAuthProvider} from '@react-oauth/google'
import RefreshHandler from './RefreshHandler'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const GoogleAuthWrapper = ()=>{
  return(
    <GoogleOAuthProvider clientId='431482491657-9bv9bejrtodr3cdta86o3odngufc5e8v.apps.googleusercontent.com'>
        <GoogleLogin></GoogleLogin>
    </GoogleOAuthProvider>
  )
  }
  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to="/login" />;
  }
  return (
    <BrowserRouter>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route path='/login' element={<GoogleAuthWrapper/>}/>
      <Route path='/' element={<Navigate to='/login'/>}/>
      <Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>}/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
