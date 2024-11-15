import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, Box } from '@mui/material';

const CodeModal = ({ initialData, onSave, onClose }) => {
  const [code, setCode] = useState(initialData?.code || '');
  const [width, setWidth] = useState(initialData?.width || 50);
  const [height, setHeight] = useState(initialData?.height || 30);
  const [fontSize, setFontSize] = useState(initialData?.fontSize || 1);

  const handleSave = () => {
    onSave({ code, width, height, fontSize });
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Edit Code Block' : 'Add Code Block'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <TextField
            label="Code"
            multiline
            minRows={5}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code here..."
            InputProps={{ style: { fontFamily: 'monospace' } }}
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
        </Box>
      </DialogContent>
      <Box display="flex" justifyContent="space-around" p={2}>
        <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
        <Button onClick={onClose} variant="contained" color="error">Cancel</Button>
      </Box>
    </Dialog>
  );
};

export default CodeModal;
