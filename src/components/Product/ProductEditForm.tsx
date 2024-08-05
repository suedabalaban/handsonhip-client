import * as React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

interface ProductEditFormProps {
  open: boolean;
  product: {
    id: number;
    productName: string;
    description: string;
    imageUrl: string;
    price: number;
  };
  onClose: () => void;
  onSave: (product: { id: number; productName: string; description: string; imageUrl: string; price: number }) => void;
}

const ProductEditForm: React.FC<ProductEditFormProps> = ({ open, product, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = React.useState(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProduct({
      ...editedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(editedProduct);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="productName"
          label="Product Name"
          type="text"
          fullWidth
          value={editedProduct.productName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          value={editedProduct.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="imageUrl"
          label="Image URL"
          type="text"
          fullWidth
          value={editedProduct.imageUrl}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="price"
          label="Price"
          type="number"
          fullWidth
          value={editedProduct.price}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductEditForm;
