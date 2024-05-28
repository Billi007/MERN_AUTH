import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        password: "",
     })

     
     const loginUser = async(e) => {
      e.preventDefault()

      const {email, password} = data

      try {
        const {data} = await axios.post('/login', {email, password})
        if(data.error){
          toast.error(data.error)
     
          }
          else{
           setData({})
           toast.success('login successfull. Welcome!')
           navigate('/')
          }

      } catch (error) {
        console.log(error)
      }
     }

  return (
    <div className="container">
        <form onSubmit={loginUser}>
        <label htmlFor="email">Email</label>
        <input 
        type="email" 
        name="email" 
        id="email" 
        placeholder='john@dev' 
        value={data.name} 
        onChange={e => setData({...data, email: e.target.value})}/>

        <label htmlFor="password">Password</label>
        <input 
        type="password" 
        name="password" 
        id="password" 
        placeholder='password'
        value={data.password}
        onChange={e => setData({...data, password: e.target.value})}
         />
        <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login