import React from 'react';
import { Paper, Typography, Button } from '@mui/material';

type Product = {
  id: number;
  productName: string;
  description: string;
  price: number;
  imageUrl: string;
};

type ProductItemProps = {
  product: Product;
  onClick: () => void;
};

const ProductItem: React.FC<ProductItemProps> = ({ product, onClick }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: '16px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',  
        minWidth: '150px',  
        height: '400px',   
        overflow: 'hidden',   
        textAlign: 'center'
      }}
      onClick={onClick}
    >
      <Typography variant="h6" sx={{ marginBottom: '8px' }}>{product.productName}</Typography>
      <img
        src={product.imageUrl}
        alt={product.productName}
        style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '8px' }}  
      />
      <Typography variant="body2" sx={{ marginBottom: '8px' }}>{product.description}</Typography>
      <Typography variant="body1" sx={{ marginBottom: '8px' }}>${product.price.toFixed(2)}</Typography>
      <Button variant="contained" color="primary" onClick={onClick}>
        Edit
      </Button>
    </Paper>
  );
};

export default ProductItem;