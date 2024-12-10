import React from 'react'
import NavBar from './Navbar'
import Aboutus from './Aboutus'
import Courses from './Courses'
import Banner from './Banner'
import Services from './Services'
import Handsonexp from './Handsonexp'
import Blog from './Blog'
import Footer from './Footer'

const Dashboard = () => {
  return (
    <div>
      <NavBar/>
      <Banner/>
      <Aboutus/>
      <Courses/>
      <Services/>
      <Handsonexp/>
      <Blog/>
      <Footer/>

      
    </div>
  )
}

export default Dashboard
