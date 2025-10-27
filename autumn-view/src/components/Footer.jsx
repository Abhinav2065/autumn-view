import React from 'react'
import { Link } from 'react-router-dom'
import '../style/Footer.css'


const Footer = () => {
  return (
    <div>
        <div className="footer">
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/map'>Map</Link></li>
                <li><Link tp='/featured'>Featured</Link></li>
                <li><Link to='/About'>About</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Footer