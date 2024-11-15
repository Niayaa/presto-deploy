import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, Checkbox, FormControlLabel, Box } from '@mui/material';

const VideoModal = ({ onSave, onClose, initialData }) => {
  const [url, setUrl] = useState(initialData?.url || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [width, setWidth] = useState(initialData?.width || 50);
  const [height, setHeight] = useState(initialData?.height || 30);
  const [autoPlay, setAutoPlay] = useState(initialData?.autoPlay || false);

  const handleSave = () => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}${autoPlay ? '?autoplay=1' : ''}`;
      onSave({ url: embedUrl, description, width, height, autoPlay });
    } else if (url.includes('youtube.com/embed/')) {
      onSave({ url: `${url}${autoPlay ? '?autoplay=1' : ''}`, description, width, height, autoPlay });
    } else {
      alert('Please enter a valid YouTube URL.');
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Edit Video Element' : 'Add Video Element'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <TextField
            label="Video URL"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
          />
          <TextField
            label="Description (alt text)"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Width (%)"
            type="number"
            value={width}
            onChange={(e) => setWidth(parseFloat(e.target.value))}
          />
          <TextField
            label="Height (%)"
            type="number"
            value={height}
            onChange={(e) => setHeight(parseFloat(e.target.value))}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={autoPlay}
                onChange={(e) => setAutoPlay(e.target.checked)}
              />
            }
            label="Auto-play"
          />
        </Box>
      </DialogContent>
      <Box display="flex" justifyContent="space-around" p={2}>
        <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
        <Button onClick={onClose} variant="contained" color="error">Cancel</Button>
      </Box>
    </Dialog>
  );
};

export default VideoModal;
