import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const data = localStorage.getItem('user-info')
    const userData = JSON.parse(data);
    setUserInfo(userData)
  },[])
  const handleLogout = ()=>{
    localStorage.removeItem('user-info');
    navigate('/login')
  }
  return (
    <div>
      <h1>Welcome</h1>
        <div><img height={100} width={100} src={userInfo?.image} alt={userInfo?.email} /> <h1>{userInfo?.name}</h1>
        </div>
      <h3>Email: {userInfo?.email}</h3>
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
