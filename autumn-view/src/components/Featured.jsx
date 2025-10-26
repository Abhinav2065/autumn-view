import React from 'react'
import '../style/Featured.css'
import { Link } from 'react-router-dom'

const capitalizeFirstLetter = (str) => {
    if (typeof str !== 'string' || str.length === 0) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const Featured = ({ foliageLocations }) => {
  return (
    <div>
      <div className="featured">
        <div className="featured-hero">
          <h2>Featured Places</h2>
          <p>View Some of the Featured Places!</p>
        </div>

        <div className="cards">
          {foliageLocations.map(location => (
            <div key={location.id} className="card">
              <h4>{location.name}</h4>
              <p>{location.description}</p>
              <p>{capitalizeFirstLetter(location.status)} Colors</p>
              <Link to='/map'>
                <button className="view-on-map-btn">Map</button>
              </Link>
            </div>
          ))}
        </div>

        <div className="add-places">
          <Link 
            to='/map' 
            state={{ showAddLocation: true }}
          >
            <button className='add-btn'>Add a Place!</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Featured

