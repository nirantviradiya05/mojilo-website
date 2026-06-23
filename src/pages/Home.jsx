import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Category from '../components/Category'
import HomeDisplay from '../components/Homedisplay'
import Benner1 from '../components/Benner1'
import Benner2 from '../components/Benner2'
import Line from '../components/Line'
import CustomBanner from '../components/CoustomBenner'
import Benner3 from '../components/Benner3'
import LetsTalk from '../components/Let\'sTalk'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero />
      <Category />
      <HomeDisplay />
      <Benner1 />
      <Benner2 />
      <Line />
      <CustomBanner />
      <Benner3 />
      <LetsTalk />
    </div>
  )
}

export default Home