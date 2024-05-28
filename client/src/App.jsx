import {Route, Routes} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import { UserContextProvider } from './context/UserContext'


function App() {

  axios.defaults.baseURL = 'http://localhost:5000'
  axios.defaults.withCredentials = true

  return (
   <UserContextProvider>
     <Navbar/>
      <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
     </Routes>
   </UserContextProvider>
  )
}

export default App
