import React from 'react';
import ElementEditor from './elementEditor';
import { Box } from '@mui/material';

const Slide = ({ elements, setElements }) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f9',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '80%' },
          height: '70vh',
          backgroundColor: 'white',
          border: '1px solid #ddd',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <ElementEditor elements={elements} setElements={setElements} />
      </Box>
    </Box>
  );
};

export default Slide;
