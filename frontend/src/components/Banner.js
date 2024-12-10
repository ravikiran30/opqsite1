import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import img1 from '../images/banner/203691_advance-skills-web.png'
import img2 from '../images/banner/239379_Devops-web.png'
import img3 from '../images/banner/218643_register-web.png'
import img4 from '../images/courses/Devops.jpg';
import img5 from '../images/courses/OIP.jpg';
import img6 from '../images/courses/FSWD.jpg';



const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    img1,
    img2,
    img3,
  ];


  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Box className="relative  w-full p-[1rem] mx-auto bg-gradient-to-r from-gray-100 to-white">
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="w-full h-auto" />
      <IconButton
        sx={{
          position: 'absolute',
          top: '50%',
          left: '1rem',
          transform: 'translateY(-50%)',
          backgroundColor: '',
          zIndex: 1,
        }}
        onClick={handlePrev}
      >
        <ArrowBack />
      </IconButton>
      <IconButton
        sx={{
          position: 'absolute',
          top: '50%',
          right: '1rem',
          transform: 'translateY(-50%)',
          backgroundColor: '',
          zIndex: 1,
        }}
        onClick={handleNext}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
};

export default Banner;