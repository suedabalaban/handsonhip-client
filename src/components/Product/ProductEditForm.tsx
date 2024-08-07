import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography  } from '@mui/material';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

interface ProductEditFormProps {
  open: boolean;
  product: Product | null; 
  onClose: () => void;
  onSave: (updatedProduct: Product) => Promise<void>;
}

const ProductEditForm: React.FC<ProductEditFormProps> = ({ open, product, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState<Product | null>(product);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (editedProduct) {
      setEditedProduct({
        ...editedProduct,
        [name]: value,
      });
    }
  };

  const handleSave = async () => {
    if (editedProduct) {
      await onSave(editedProduct);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        {editedProduct ? (
          <>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={editedProduct.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={editedProduct.description}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="imageUrl"
              label="Image URL"
              type="text"
              fullWidth
              variant="standard"
              value={editedProduct.imageUrl}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="price"
              label="Price"
              type="number"
              fullWidth
              variant="standard"
              value={editedProduct.price}
              onChange={handleChange}
            />
          </>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductEditForm;
