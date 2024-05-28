import  { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

function Register() {
  
  const [data, setData] = useState({
    userName:"",
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  const registerUser = async (e) => {
    e.preventDefault()
    const {userName, email, password} = data
    
    try {
     const {data} = await axios.post('/register', {userName, email, password})

     if(data.error){
     toast.error(data.error)

     }
     else{
      setData({})
      toast.success(`${userName} registered succesfullly!`)
      navigate('/login')
     }

    } catch (error) {
      console.log(error)
    }}

  return (
    <div className="container">

        <form onSubmit={registerUser}>
        <label htmlFor="userName">Name</label>
        <input 
        type="text"
        name="userName" 
        id="userName" 
        placeholder='john dev' 
        value={data.userName} 
        onChange={e => setData({...data, userName: e.target.value})}/>

        <label htmlFor="email">Email</label>
        <input 
        type="email" 
        name="email" 
        id="email" 
        placeholder='john@dev'  
        value={data.email} 
        onChange={e => setData({...data, email: e.target.value})}/>

        <label htmlFor="password">Password</label>
        <input 
        type="password"
         name="password" 
         id="password" 
         placeholder='password'  
         value={data.password} 
         onChange={e => setData({...data, password: e.target.value})}/>

        <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register