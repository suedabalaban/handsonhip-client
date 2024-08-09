import React from 'react';
import { Paper, Typography, Button } from '@mui/material';

type Product = {
  productID: number;
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
      padding: '12px',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      maxWidth: '300px', 
      height: 'auto', 
      maxHeight: '400px', 
      overflow: 'hidden',
      textAlign: 'center',
      boxSizing: 'border-box'
    }}
    onClick={onClick}
    >
      <img
        src={product.imageUrl}
        alt={product.productName}
        style={{ width: '100%', height: '160px', objectFit: 'cover', marginBottom: '8px' }}
      />
      <Typography
        variant="h6"
        sx={{
          marginBottom: '4px',
          overflow: 'visible',
          textOverflow: 'clip',
          whiteSpace: 'normal',
          height: 'auto',
          lineHeight: 'normal'
        }}
      >
        {product.productName}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          marginBottom: '8px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          height: '40px',
          lineHeight: '20px'
        }}
      >
        {product.description}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '8px', fontWeight: 'bold' }}>
        ${product.price.toFixed(2)}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        sx={{ width: '100%', marginTop: 'auto' }}
      >
        Edit
      </Button>
    </Paper>
  );
};

export default ProductItem;
