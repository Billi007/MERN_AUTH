import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
   <div className="container">
    <nav>
     <Link to ='/'>Home</Link>
     <Link to ='/register'>Register</Link>
     <Link to ='/login'>Login</Link>
    </nav>
   </div>
  )
}

export default Navbar