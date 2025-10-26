import React from 'react'
import { Link } from 'react-router-dom'
import image from '../../assets/image.png'

const MapPreview = () => {
  return (
    <div>
        <div className="map-preview"> 
            <Link to='/map'>

            <h3>View the Full Map!</h3>
            <img src={image} alt="Image" className='preview' />
            </Link>
        </div>
    </div>
  )
}

export default MapPreview