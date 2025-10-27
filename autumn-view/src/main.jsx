import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Map from './components/Map'
import Featured from './components/Featured'
import Error from './components/Error'
import About from './components/About'


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
  },
  {
    id: 6,
    name: "Stanley Park, Vancouver",
    position: [49.3043, -123.1443],
    status: "peak",
    description: "Seaside park with dense forest areas"
  },
  {
    id: 7,
    name: "Bois de Boulogne, Paris",
    position: [48.8636, 2.2532],
    status: "peak",
    description: "Large Parisian park with autumn colors"
  },
  {
    id: 8,
    name: "Ueno Park, Tokyo",
    position: [35.7148, 139.7733],
    status: "approaching",
    description: "Famous for cherry blossoms and fall foliage"
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
  },
  {
    id: 11,
    name: "Griffith Park, Los Angeles",
    position: [34.1367, -118.2942],
    status: "approaching",
    description: "Urban wilderness with oak woodlands"
  },
  {
    id: 12,
    name: "Kew Gardens, London",
    position: [51.4844, -0.2917],
    status: "peak",
    description: "World-famous botanical gardens"
  },
  {
    id: 13,
    name: "Yellowstone National Park",
    position: [44.4280, -110.5885],
    status: "peak",
    description: "Aspen groves against geothermal features"
  },
  {
    id: 14,
    name: "Banff National Park, Canada",
    position: [51.4968, -115.9281],
    status: "peak",
    description: "Canadian Rockies with golden larch trees"
  },
  {
    id: 15,
    name: "Great Smoky Mountains, USA",
    position: [35.6131, -83.5070],
    status: "peak",
    description: "Most visited national park with vibrant colors"
  },
  {
    id: 16,
    name: "Jiuzhaigou Valley, China",
    position: [33.2000, 103.9000],
    status: "approaching",
    description: "Colorful lakes and waterfalls surrounded by autumn foliage"
  },
  {
    id: 17,
    name: "Black Forest, Germany",
    position: [48.3000, 8.2000],
    status: "peak",
    description: "Dense forest with mixed hardwoods"
  },
  {
    id: 18,
    name: "Blue Mountains, Australia",
    position: [-33.7000, 150.3000],
    status: "approaching",
    description: "Eucalyptus forests with unique autumn colors"
  },
  {
    id: 19,
    name: "Khao Yai National Park, Thailand",
    position: [14.4400, 101.3700],
    status: "approaching",
    description: "Tropical forest with seasonal changes"
  },
  {
    id: 20,
    name: "Plitvice Lakes, Croatia",
    position: [44.8800, 15.6200],
    status: "peak",
    description: "Turquoise lakes surrounded by autumn colors"
  },
  {
    id: 21,
    name: "Mount Fuji Five Lakes, Japan",
    position: [35.5000, 138.7000],
    status: "peak",
    description: "Stunning views of Fuji with autumn foliage"
  },
  {
    id: 22,
    name: "Adirondack Mountains, New York",
    position: [44.1222, -74.1167],
    status: "peak",
    description: "Vast wilderness with brilliant fall colors"
  },
  {
    id: 23,
    name: "Lake District, England",
    position: [54.5000, -3.1667],
    status: "peak",
    description: "Lakes and mountains with oak and birch forests"
  },
  {
    id: 24,
    name: "Zhangjiajie National Forest, China",
    position: [29.3500, 110.4333],
    status: "approaching",
    description: "Avatar mountains with colorful foliage"
  },
  {
    id: 25,
    name: "Swiss Alps, Switzerland",
    position: [46.8000, 8.2333],
    status: "peak",
    description: "Alpine landscapes with larch trees"
  },
  {
    id: 26,
    name: "Vermont Route 100, USA",
    position: [43.6500, -72.7500],
    status: "peak",
    description: "Scenic byway through maple forests"
  },
  {
    id: 27,
    name: "Hallstatt, Austria",
    position: [47.5622, 13.6492],
    status: "peak",
    description: "Alpine village with lakeside foliage"
  },
  {
    id: 28,
    name: "Nara Park, Japan",
    position: [34.6851, 135.8389],
    status: "peak",
    description: "Ancient park with deer and maple trees"
  },
  {
    id: 29,
    name: "Acadia National Park, Maine",
    position: [44.3500, -68.2167],
    status: "peak",
    description: "Coastal park with mixed hardwood forests"
  },
  {
    id: 30,
    name: "Killarney National Park, Ireland",
    position: [52.0167, -9.5000],
    status: "peak",
    description: "Oak and yew woodlands with lakes"
  },
  {
    id: 31,
    name: "Rocky Mountain National Park, USA",
    position: [40.3428, -105.6836],
    status: "past",
    description: "Aspen groves in mountain valleys"
  },
  {
    id: 32,
    name: "Bavarian Forest, Germany",
    position: [49.0000, 13.2000],
    status: "peak",
    description: "Europe's first national park with diverse foliage"
  },
  {
    id: 33,
    name: "Hokkaido, Japan",
    position: [43.5000, 143.0000],
    status: "peak",
    description: "Northern island with early autumn colors"
  },
  {
    id: 34,
    name: "White Mountains, New Hampshire",
    position: [44.2706, -71.3036],
    status: "peak",
    description: "Famous for vibrant red maple displays"
  },
  {
    id: 35,
    name: "Lake Bled, Slovenia",
    position: [46.3686, 14.1136],
    status: "peak",
    description: "Alpine lake surrounded by autumn forests"
  },
  {
    id: 36,
    name: "Shenandoah National Park, Virginia",
    position: [38.5333, -78.3500],
    status: "peak",
    description: "Skyline Drive through colorful forests"
  },
  {
    id: 37,
    name: "Canadian Rockies, Alberta",
    position: [52.0000, -117.0000],
    status: "peak",
    description: "Golden larch trees against mountain backdrop"
  },
  {
    id: 38,
    name: "Lake Louise, Canada",
    position: [51.4257, -116.1771],
    status: "peak",
    description: "Turquoise lake with golden larch forests"
  },
  {
    id: 39,
    name: "Mount Rainier, Washington",
    position: [46.8523, -121.7603],
    status: "past",
    description: "Subalpine meadows with fall colors"
  },
  {
    id: 40,
    name: "Bryce Canyon, Utah",
    position: [37.5930, -112.1871],
    status: "peak",
    description: "Hoodoos with ponderosa pine forests"
  },
  {
    id: 41,
    name: "Seoraksan National Park, South Korea",
    position: [38.1217, 128.4653],
    status: "peak",
    description: "Dramatic peaks with vibrant foliage"
  },
  {
    id: 42,
    name: "Lake Tahoe, California",
    position: [39.0968, -120.0324],
    status: "peak",
    description: "Alpine lake with aspen groves"
  },
  {
    id: 43,
    name: "The Cotswolds, England",
    position: [51.8000, -1.9000],
    status: "peak",
    description: "Quaint villages with ancient woodlands"
  },
  {
    id: 44,
    name: "Mackinac Island, Michigan",
    position: [45.8489, -84.6189],
    status: "peak",
    description: "Car-free island with historic architecture and fall colors"
  },
  {
    id: 45,
    name: "Hortobágy National Park, Hungary",
    position: [47.5833, 21.1500],
    status: "peak",
    description: "Puszta landscape with autumn hues"
  },
  {
    id: 46,
    name: "Mount Hood, Oregon",
    position: [45.3736, -121.6960],
    status: "peak",
    description: "Volcanic peak with mixed conifer forests"
  },
  {
    id: 47,
    name: "Lake Kawaguchi, Japan",
    position: [35.5167, 138.7667],
    status: "peak",
    description: "Perfect Mount Fuji reflections with autumn colors"
  },
  {
    id: 48,
    name: "The Berkshires, Massachusetts",
    position: [42.3500, -73.2500],
    status: "peak",
    description: "Rolling hills with brilliant New England foliage"
  },
  {
    id: 49,
    name: "Rila Monastery, Bulgaria",
    position: [42.1333, 23.3400],
    status: "peak",
    description: "Medieval monastery surrounded by mountain forests"
  },
  {
    id: 50,
    name: "Porongurup National Park, Australia",
    position: [-34.6833, 117.8667],
    status: "approaching",
    description: "Ancient granite peaks with karri forests"
  },
  {
    id: 51,
    name: "Theth National Park, Albania",
    position: [42.3967, 19.7733],
    status: "peak",
    description: "Accursed Mountains with beech forests"
  },
  {
    id: 52,
    name: "Mount Cook, New Zealand",
    position: [-43.7350, 170.1000],
    status: "approaching",
    description: "Southern Alps with native beech forests"
  },
  {
    id: 53,
    name: "Transylvania, Romania",
    position: [46.7667, 23.5833],
    status: "peak",
    description: "Carpathian Mountains with dense forests"
  },
  {
    id: 54,
    name: "Lake District, Chile",
    position: [-41.1333, -72.0000],
    status: "approaching",
    description: "Andean lakes with arrayán forests"
  },
  {
    id: 55,
    name: "Gullfoss, Iceland",
    position: [64.3264, -20.1211],
    status: "past",
    description: "Golden waterfall with Arctic birch forests"
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

          <Route path='/about' element={<About/>}/>

          <Route path='*' element={<Error/>} />
          
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