import React from 'react'
import { Link } from 'react-router-dom'
import '../style/Navbar.css'

const Navbar = () => {

  return (
    <div className='navbar-bg'>
        <div className="navbar">
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/map'>Map</Link></li>
                <li><Link to='/featured'>Featured</Link></li>
                <li><Link to='/saved'>Saved</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar