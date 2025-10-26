import React from 'react'
import Hero from './Home/Hero'
import QuickAction from './Home/QuickAction'
import '../style/Home.css'


const Home = () => {
  return (
    <div className='home'>
        <Hero></Hero>
        <QuickAction></QuickAction>
    </div>
  )
}

export default Home