import React from 'react'
import { Link } from 'react-router-dom'


const MapPreview = () => {
  return (
    <div>
        <div className="map-preview">
            <div className="map-header">
                <h2>Explore Great Places Near You.</h2>
                <Link to='/map'>View Full Map!</Link>
            </div>

            <div className="map-container">
                Map Loading...
            </div>
        </div>
    </div>
  )
}

export default MapPreview