import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Map from './components/Map'
import Featured from './components/Featured'

const App = () => {
  const [foliageLocations, setFoliageLocations] = useState([
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
    }
  ])

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path='/map' 
          element={
            <Map 
              foliageLocations={foliageLocations} 
              setFoliageLocations={setFoliageLocations} 
            />
          }
        />
        <Route 
          path='/featured' 
          element={
            <Featured foliageLocations={foliageLocations} />
          }
        />
      </Routes>
      <Footer />
    </Router>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)