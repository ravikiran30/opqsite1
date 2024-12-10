import React from 'react';
import { Button, Box } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

const Scroll = () => {
  
    const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box className="fixed bottom-4 right-4">
      <Button
        variant="contained"
        color="primary"
        onClick={handleScrollToTop}
      
      ><KeyboardArrowUp />
        
      </Button>
    </Box>
  );
};

export default Scroll;
