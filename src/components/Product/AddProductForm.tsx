import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

interface AddProductFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: { productName: string; description: string; imageUrl: string; price: number }) => Promise<void>;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ open, onClose, onSave }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState<number | ''>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'productName') setProductName(value);
    if (name === 'description') setDescription(value);
    if (name === 'imageUrl') setImageUrl(value);
    if (name === 'price') setPrice(Number(value) || '');
  };

  const handleSave = async () => {
    // Form validation
    if (!productName || !description || !imageUrl || price === '') {
      alert('Please fill all fields.');
      return;
    }

    try {
      const newProduct = { productName, description, imageUrl, price };
      await onSave(newProduct);
      onClose(); // Close dialog after saving
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="productName"
          label="Product Name"
          type="text"
          fullWidth
          variant="standard"
          value={productName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          value={description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="imageUrl"
          label="Image URL"
          type="text"
          fullWidth
          variant="standard"
          value={imageUrl}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="price"
          label="Price"
          type="number"
          fullWidth
          variant="standard"
          value={price}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductForm;
