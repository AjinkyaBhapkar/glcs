import React from 'react'
import Navbar from '../components/Navbar'
import pic from './email.jpg'
const Contact = () => {
  return (
    <div>
      <Navbar/>
      <h3>For any concern regarding this website contact here:</h3>
    <img style={{'width':'300px'}} src={pic}alt="email-id in image" />

    </div>
  )
}

export default Contact
