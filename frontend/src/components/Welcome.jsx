import axios from 'axios';
import React, { useEffect, useState } from 'react'


const Welcome = () => {

  const [user , setUser] = useState(null)
  useEffect(()=>{

    const fetchUser = async()=>{
      try {
        const response = await axios.get("http://localhost:5000/getUser");
        console.log(response.data)
        setUser(response.data)
      } catch (error) {
        console.error('fetching user data eror :' , error)
      }
    }
    fetchUser()
  },[])

  return (
    <div>
        <h1>Dashboard</h1>
        <h2>Welcome back , { user ? user.name : "user"} </h2>
    </div>
  )
}

export default Welcome