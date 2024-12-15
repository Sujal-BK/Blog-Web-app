import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../Context/auth'
import toast from 'react-hot-toast'
const Logout = () => {

    const {Logout} = useAuth()

    useEffect(()=>{
        toast.success("Logout Successfully")
        Logout()
        
    },[Logout])
  return (
    <div>
      <Navigate to='/login'/>
    </div>
  )
}

export default Logout
