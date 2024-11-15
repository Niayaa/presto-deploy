import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, Box } from '@mui/material';

const ImageModal = ({ onSave, onClose, initialData }) => {
  const [url, setUrl] = useState(initialData?.src || '');
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(initialData?.alt || '');
  const [width, setWidth] = useState(initialData?.width || 30);
  const [height, setHeight] = useState(initialData?.height || 20);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => setFile(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSave = () => {
    const imageSrc = file || url;
    onSave({ src: imageSrc, alt: description, width, height });
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Edit Image Element' : 'Add Image Element'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <TextField
            label="Image URL"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setFile(null);
            }}
          />
          <Button variant="outlined" component="label">
            Upload File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          <TextField
            label="Description (alt text)"
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
        </Box>
      </DialogContent>
      <Box display="flex" justifyContent="space-around" p={2}>
        <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
        <Button onClick={onClose} variant="contained" color="error">Cancel</Button>
      </Box>
    </Dialog>
  );
};

export default ImageModal;
