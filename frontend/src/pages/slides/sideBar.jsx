import React from 'react';
import { Box, Button } from '@mui/material';

const Sidebar = ({ onAddText, onAddImage, onAddVideo, onAddCode }) => {
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '200px' },
        backgroundColor: '#333',
        padding: '15px 10px',
        display: 'flex',
        flexDirection: { xs: 'row', sm: 'column' },
        gap: 2,
        alignItems: 'center',
        borderRadius: '8px',
        marginTop: '20px',
        justifyContent: { xs: 'space-around', sm: 'initial' },
      }}
    >
      <SidebarButton onClick={onAddText}>Text</SidebarButton>
      <SidebarButton onClick={onAddImage}>Image</SidebarButton>
      <SidebarButton onClick={onAddVideo}>Video</SidebarButton>
      <SidebarButton onClick={onAddCode}>Code</SidebarButton>
    </Box>
  );
};

const SidebarButton = ({ children, onClick }) => (
  <Button
    onClick={onClick}
    sx={{
      width: '100%',
      backgroundColor: '#555',
      color: '#fff',
      padding: '8px',
      fontSize: '14px',
      borderRadius: '4px',
      transition: 'background-color 0.3s',
      '&:hover': { backgroundColor: '#666' },
      '&:focus': {
        outline: 'none',
        boxShadow: '0 0 0 2px #888',
      },
    }}
    variant="contained"
  >
    {children}
  </Button>
);

export default Sidebar;
