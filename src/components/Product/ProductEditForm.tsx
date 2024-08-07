import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography, Box } from '@mui/material';

interface Product {
  productID: number;
  productName: string;
  description: string;
  imageUrl: string;
  price: number;
}

interface ProductEditFormProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (updatedProduct: Product) => Promise<void>;
  onDelete: (productID: number) => Promise<void>;
}

const ProductEditForm: React.FC<ProductEditFormProps> = ({ open, product, onClose, onSave, onDelete }) => {
  const [editedProduct, setEditedProduct] = useState<Product | null>(product);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

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
    if (editedProduct && editedProduct.productID) {
      await onSave(editedProduct);
    } else {
      console.error('Edited Product ID is missing');
    }
  };

  const handleDelete = async () => {
    if (editedProduct && editedProduct.productID) {
      await onDelete(editedProduct.productID);
      onClose(); // Close dialog after deletion
    }
  };

  const handleConfirmDelete = () => {
    setConfirmDelete(true);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
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
              name="productName"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={editedProduct.productName}
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
        {confirmDelete && (
          <Box sx={{ marginTop: 2, marginBottom: 2, padding: 2, border: '1px solid red', borderRadius: 2 }}>
            <Typography color="error">Are you sure you want to delete this product?</Typography>
            <Button onClick={handleDelete} color="error" sx={{ marginRight: 1 }}>
              Confirm Delete
            </Button>
            <Button onClick={handleCancelDelete}>Cancel</Button>
          </Box>
        )}
      </DialogContent>
      <DialogActions style={{ justifyContent: 'space-between' }}>
        {!confirmDelete && (
          <Button onClick={handleConfirmDelete} color="error" style={{ marginRight: 'auto' }}>
            Delete
          </Button>
        )}
        <div>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default ProductEditForm;
