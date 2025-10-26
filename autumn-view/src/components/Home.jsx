import React from 'react'
import Hero from './Home/Hero'
import QuickAction from './Home/QuickAction'
import MapPreview from './Home/MapPreview'
import '../style/Home.css'


const Home = () => {
  return (
    <div className='home'>
        <Hero></Hero>
        <QuickAction></QuickAction>
        <MapPreview></MapPreview>
    </div>
  )
}

export default Home