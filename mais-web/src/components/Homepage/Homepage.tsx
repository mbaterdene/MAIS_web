import React from 'react'
import SlidingImg from './SlidingImg'
import image1 from '../../assets/image_1.jpg'
import image2 from '../../assets/image_2.jpg' 
import image3 from '../../assets/image_3.jpg'
import image4 from '../../assets/image_4.jpg'
import image5 from '../../assets/image_5.jpg'

const Homepage = () => {
    const slides = [image1, image2, image3, image4, image5]
    const containerStyles = {
        width: '100vw',
        margin: '0',
        overflow: 'hidden',

    };
  return (
    <>
      <div style={containerStyles} className='h-[20rem]'>
          <SlidingImg slides ={slides}/>
      </div>
    </>
  )
}

export default Homepage