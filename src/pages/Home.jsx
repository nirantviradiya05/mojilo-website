import React from 'react'
import Navbar from '../componet/Navbar'
import Hero from '../componet/Hero'
import Category from '../componet/Category'
import HomeDisplay from '../componet/Homedisplay'
import Benner1 from '../componet/Benner1'
import Benner2 from '../componet/Benner2'
import Line from '../componet/Line'
import CustomBanner from '../componet/CoustomBenner'
import Benner3 from '../componet/Benner3'
import LetsTalk from '../componet/Let\'sTalk'
import Footer from '../componet/Footer'

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