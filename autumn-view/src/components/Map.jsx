import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { Link , useLocation} from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import '../style/Map.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

function MapClickHandler({ choosingLocation, onMapClick }) {
  useMapEvents({
    click: (e) => {
      if (choosingLocation) {
        onMapClick(e)
      }
    },
  })
  return null
}

const Map = ({foliageLocations, setFoliageLocations}) => {
  const location = useLocation()
  const [userPosition, setUserPosition] = useState(null) 
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [choosingLocation, setChoosingLocation] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [showFinalizePopup, setShowFinalizePopup] = useState(false)
  const [newLocation, setNewLocation] = useState({
    name: '',
    description: '',
    status: 'peak'
  })
  const [fakeReports, setFakeReports] = useState({})
  const [ratings, setRatings] = useState({})
  const [isRating, setIsRating] = useState(false)
  const [currentRatingId, setCurrentRatingId] = useState(null)
  const [userRating, setUserRating] = useState(0)

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R_earth = 6371 // radius of earth
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return (R_earth * c).toFixed(1) // Distance!
  }

  const handleRate = (id) => {
    setCurrentRatingId(id)
    setIsRating(true)
    setUserRating(0)
  }

  const handleRatingSubmit = () => {
    if (userRating === 0) {
      alert('Please select a rating!')
      return
    }

    const userKey = 'user_' + Math.random().toString(36).substr(2, 9)
    const currentRatings = JSON.parse(localStorage.getItem('locationRatings') || '{}')
    
    if (!currentRatings[currentRatingId]) {
      currentRatings[currentRatingId] = { total: 0, count: 0, users: {} }
    }
    
    if (currentRatings[currentRatingId].users[userKey]) {
      alert('You have already rated this location!')
      return
    }
    
    currentRatings[currentRatingId].total += userRating
    currentRatings[currentRatingId].count += 1
    currentRatings[currentRatingId].users[userKey] = userRating
    
    localStorage.setItem('locationRatings', JSON.stringify(currentRatings))
    setRatings(currentRatings)
    
    setIsRating(false)
    setCurrentRatingId(null)
    setUserRating(0)
    alert(`Thank you for your ${userRating} star rating!`)
  }

  const getAverageRating = (id) => {
    const locationRatings = ratings[id]
    if (!locationRatings || locationRatings.count === 0) return 0
    return (locationRatings.total / locationRatings.count).toFixed(1)
  }

  const handleFake = (id) => {
    const userKey = 'user_' + Math.random().toString(36).substr(2, 9)
    const currentReports = JSON.parse(localStorage.getItem('fakeReports') || '{}')
    
    if (!currentReports[id]) {
      currentReports[id] = { count: 0, users: [] }
    }
    
    if (currentReports[id].users.includes(userKey)) {
      alert('You have already reported this location!')
      return
    }
    
    currentReports[id].users.push(userKey)
    currentReports[id].count += 1
    
    localStorage.setItem('fakeReports', JSON.stringify(currentReports))
    setFakeReports(currentReports)
    
    if (currentReports[id].count >= 5) {
      const updatedLocations = foliageLocations.filter(location => location.id !== id)
      setFoliageLocations(updatedLocations)
      alert('Location removed due to multiple fake reports.')
    } else {
      alert(`Reported! This location has ${currentReports[id].count} report(s).`)
    }
  }

  const handleAddLocation = () => {
    setShowForm(true)
    setNewLocation({ name: '', description: '', status: 'peak' })
    setSelectedPosition(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewLocation(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleChoosePlace = () => {
    if (!newLocation.name || !newLocation.description) {
      alert('Please fill in both name and description first!')
      return
    }
    setChoosingLocation(true)
    setShowForm(false)
    setSelectedPosition(null) 
  }

  const handleMapClick = (e) => {
    if (choosingLocation) {
      setSelectedPosition([e.latlng.lat, e.latlng.lng])
    }
  }

  const handleOkButton = () => {
    if (selectedPosition) {
      setChoosingLocation(false)
      setShowFinalizePopup(true)
    } else {
      alert('Please click on the map to select a location first!')
    }
  }

  const handleFinalize = () => {
    if (!selectedPosition) return

    const newFoliageLocation = {
      id: Date.now(),
      name: newLocation.name,
      position: selectedPosition,
      status: newLocation.status,
      description: newLocation.description
    }

    setFoliageLocations(prev => [...prev, newFoliageLocation])
    setNewLocation({ name: '', description: '', status: 'peak' })
    setSelectedPosition(null)
    setShowFinalizePopup(false)
    alert('Location added!')
  }

  const handleCancel = () => {
    setShowForm(false)
    setChoosingLocation(false)
    setSelectedPosition(null)
    setShowFinalizePopup(false)
    setNewLocation({ name: '', description: '', status: 'peak' })
    setIsRating(false)
    setCurrentRatingId(null)
    setUserRating(0)
  }

  useEffect(() => {
    const savedReports = localStorage.getItem('fakeReports')
    if (savedReports) {
      setFakeReports(JSON.parse(savedReports))
    }

    const savedRatings = localStorage.getItem('locationRatings')
    if (savedRatings) {
      setRatings(JSON.parse(savedRatings))
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude
          const userLng = position.coords.longitude
          
          setUserPosition([userLat, userLng])
          setIsLoading(false)
        },
        (error) => {
          const fallbackPosition = [27.7172, 85.3240] 
          setUserPosition(fallbackPosition)
          setIsLoading(false)
        }
      )
    } else {
      const fallbackPosition = [27.7172, 85.3240]
      setUserPosition(fallbackPosition)
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (location.state?.showAddLocation) {
      setShowForm(true)
      // Clear the state so it doesn't trigger again on refresh
      window.history.replaceState({}, document.title)
    }
  }, [location])


  if (isLoading || !userPosition) {
    return (
      <div className="map-page">
        <div className="loading-map">
          <p>Finding your location and nearby foliage spots...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="map-page">
      <div className="full-map-container">
        <MapContainer 
          center={userPosition}  
          zoom={12} 
          style={{ height: '100vh', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          <MapClickHandler 
            choosingLocation={choosingLocation} 
            onMapClick={handleMapClick} 
          />
          
          <Marker position={userPosition}>
            <Popup>
              <div className="map-popup">
                <h3>Me!</h3>
                <p>You are here! Explore foliage spots around you.</p>
              </div>
            </Popup>
          </Marker>
          
          {foliageLocations.map(location => (
            <Marker key={location.id} position={location.position}>
              <Popup>
                <div className="map-popup">
                  <h3>{location.name}</h3>
                  <p>{location.description}</p>
                  <div className={`status-badge ${location.status}`}>
                    {location.status.toUpperCase()}
                  </div>
                  <div className="distance-info">
                    {userPosition && (
                      <p>
                      📍 {calculateDistance(
                        userPosition[0], 
                        userPosition[1], 
                        location.position[0], 
                        location.position[1]
                        )} km away
                      </p>
                    )}
                  </div>
                  <div className="rating-info">
                    ⭐ {getAverageRating(location.id)} ({ratings[location.id]?.count || 0} ratings)
                  </div>
                  <div className="report-info">
                    Reports: {fakeReports[location.id]?.count || 0}
                  </div>
                  <div className="popup-buttons">
                    <button 
                      className='rate-btn'
                      onClick={() => handleRate(location.id)}
                    >
                      Rate
                    </button>
                    <button 
                      className='report-fake-btn'
                      onClick={() => handleFake(location.id)}
                    >
                      Report As Fake
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {selectedPosition && choosingLocation && (
            <Marker position={selectedPosition}>
              <Popup>
                <div className="map-popup">
                  <h3>Selected Location</h3>
                  <p>Click OK to confirm this location</p>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
        
        <button className="add-location-btn" onClick={handleAddLocation}>
          + Add Location
        </button>

        {isRating && (
          <div className="form-popup-overlay">
            <div className="form-popup">
              <h3>Rate This Location</h3>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <span
                    key={star}
                    className={`star ${star <= userRating ? 'active' : ''}`}
                    onClick={() => setUserRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p>Selected: {userRating} star{userRating !== 1 ? 's' : ''}</p>
              <div className="form-buttons">
                <button onClick={handleRatingSubmit} className="submit-rating-btn">
                  Submit Rating
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showForm && (
          <div className="form-popup-overlay">
            <div className="form-popup">
              <h3>Add New Foliage Location</h3>
              
              <div className="form-group">
                <label>Name of Place:</label>
                <input
                  type="text"
                  name="name"
                  value={newLocation.name}
                  onChange={handleInputChange}
                  placeholder="Enter location name"
                />
              </div>
              
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={newLocation.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label>Foliage Status:</label>
                <select
                  name="status"
                  value={newLocation.status}
                  onChange={handleInputChange}
                >
                  <option value="peak">Peak</option>
                  <option value="approaching">Approaching Peak</option>
                  <option value="past">Past Peak</option>
                </select>
              </div>
              
              <div className="form-buttons">
                <button onClick={handleChoosePlace} className="choose-place-btn">
                  Choose Place on Map
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {choosingLocation && (
          <div className="choosing-instructions">
            <div className="instructions-content">
              <h3>📍 Click on the map to choose a location</h3>
              <p>Select a spot for your foliage location, then click OK to continue</p>
              {selectedPosition && (
                <p className="selected-coordinates">
                  Selected: {selectedPosition[0].toFixed(4)}, {selectedPosition[1].toFixed(4)}
                </p>
              )}
              <div className="choosing-buttons">
                <button onClick={handleOkButton} className="ok-btn" disabled={!selectedPosition}>
                  OK
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showFinalizePopup && (
          <div className="form-popup-overlay">
            <div className="form-popup">
              <h3>Finalize Location</h3>
              <div className="finalize-details">
                <p><strong>Name:</strong> {newLocation.name}</p>
                <p><strong>Description:</strong> {newLocation.description}</p>
                <p><strong>Status:</strong> {newLocation.status}</p>
                <p><strong>Coordinates:</strong> {selectedPosition[0].toFixed(6)}, {selectedPosition[1].toFixed(6)}</p>
              </div>
              <div className="form-buttons">
                <button onClick={handleFinalize} className="finalize-btn">
                  Finalize & Add Marker
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Map