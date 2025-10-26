import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { Link } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import '../style/Map.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Create a separate component to handle map clicks
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

const Map = () => {
  const [userPosition, setUserPosition] = useState(null) 
  const [foliageLocations, setFoliageLocations] = useState([]) 
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

  const getFoliageLocations = (lat, lng) => {
    const majorCityLocations = [
      {
        id: 1,
        name: "Central Park, New York",
        position: [40.7829, -73.9654],
        status: "peak",
        description: "Iconic urban park with stunning autumn colors"
      },
      {
        id: 2,
        name: "Shinjuku Gyoen, Tokyo",
        position: [35.6852, 139.7101],
        status: "approaching",
        description: "Beautiful Japanese garden with maple trees"
      },
      {
        id: 3,
        name: "Hyde Park, London",
        position: [51.5073, -0.1657],
        status: "peak",
        description: "Historic London park with autumn foliage"
      },
      {
        id: 4,
        name: "Jingshan Park, Beijing",
        position: [39.9213, 116.3915],
        status: "approaching",
        description: "Imperial garden with panoramic city views"
      },
      {
        id: 5,
        name: "Shivapuri Nagarjun, Kathmandu",
        position: [27.8021, 85.3678],
        status: "peak",
        description: "National park with rhododendron forests"
      },
      {
        id: 6,
        name: "Bois de Boulogne, Paris",
        position: [48.8636, 2.2532],
        status: "peak",
        description: "Large Parisian park with autumn colors"
      },
      {
        id: 7,
        name: "Ueno Park, Tokyo",
        position: [35.7148, 139.7733],
        status: "approaching",
        description: "Famous for cherry blossoms and fall foliage"
      },
      {
        id: 8,
        name: "Stanley Park, Vancouver",
        position: [49.3043, -123.1443],
        status: "peak",
        description: "Seaside park with dense forest areas"
      },
      {
        id: 9,
        name: "Lumpini Park, Bangkok",
        position: [13.7328, 100.5450],
        status: "approaching",
        description: "Green oasis in the heart of Bangkok"
      },
      {
        id: 10,
        name: "Jardim Botânico, Rio de Janeiro",
        position: [-22.9660, -43.2242],
        status: "peak",
        description: "Tropical botanical garden with diverse foliage"
      }
    ]
    return majorCityLocations
  }


  const handleFake = (id) => {
    
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
    console.log('Map clicked!', e.latlng)
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
    alert('Location added successfully!')
  }

  const handleCancel = () => {
    setShowForm(false)
    setChoosingLocation(false)
    setSelectedPosition(null)
    setShowFinalizePopup(false)
    setNewLocation({ name: '', description: '', status: 'peak' })
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude
          const userLng = position.coords.longitude
          
          setUserPosition([userLat, userLng])
          
          const nearbyFoliage = getFoliageLocations(userLat, userLng)
          setFoliageLocations(nearbyFoliage)
          setIsLoading(false)
        },
        (error) => {
          console.log("Error getting location:", error)
          const fallbackPosition = [27.7172, 85.3240] 
          setUserPosition(fallbackPosition)
          setFoliageLocations(getFoliageLocations(fallbackPosition[0], fallbackPosition[1]))
          setIsLoading(false)
        }
      )
    } else {
      const fallbackPosition = [27.7172, 85.3240]
      setUserPosition(fallbackPosition)
      setFoliageLocations(getFoliageLocations(fallbackPosition[0], fallbackPosition[1]))
      setIsLoading(false)
    }
  }, [])

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
                <h3>Your Location</h3>
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
                  <button className='report-fake-btn'>
                    Report As Fake
                  </button>
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