import React from 'react'
import {useGoogleLogin} from '@react-oauth/google'
import { googleAuth } from './api'
import {useNavigate} from 'react-router-dom'
const GoogleLogin = () => {
    const navigate = useNavigate();
    const responseGoogle = async(authResult)=>{
        try {
            if(authResult['code']){
                const result = await googleAuth(authResult['code']);
                const {email, name, image} = result.data.user;
                const token = result.data.token;
                const obj = {email,name,image,token};
                localStorage.setItem('user-info', JSON.stringify(obj))     
                navigate('/dashboard')
            }
           console.log(authResult);
            
        } catch (error) {
            console.log('Errr while requesting google code: ', error)
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code',
    })
  return (
    <div className=''>
        <button onClick={googleLogin}>Login With Google</button>
    </div>
  )
}

export default GoogleLogin
