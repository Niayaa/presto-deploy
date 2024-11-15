import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, Box } from '@mui/material';

const TextModal = ({ onSave, onClose, initialData }) => {
  const [text, setText] = useState(initialData?.text || '');
  const [width, setWidth] = useState(initialData?.width || 30);
  const [height, setHeight] = useState(initialData?.height || 10);
  const [fontSize, setFontSize] = useState(initialData?.fontSize || 1);
  const [color, setColor] = useState(initialData?.color || '#000000');

  const handleSave = () => {
    onSave({ text, width, height, fontSize, color });
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Edit Text Element' : 'Add Text Element'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <TextField
            label="Text"
            multiline
            minRows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
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
          <TextField
            label="Font Size (em)"
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(parseFloat(e.target.value))}
          />
          <TextField
            label="Color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            InputLabelProps={{ shrink: true }}
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

export default TextModal;
