import React from 'react';
import { Card, CardContent, Typography, CardMedia, CardActionArea } from '@mui/material';

type ProductItemProps = {
  product: {
    id: number;
    productName: string;
    description: string;
    price: number;
    imageUrl: string;
  };
  onClick: () => void;
};

const ProductItem: React.FC<ProductItemProps> = ({ product, onClick }) => {
  return (
    <Card onClick={onClick} style={{ cursor: 'pointer', maxWidth: 345, margin: '10px', backgroundColor: '#f5f5f5' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.imageUrl}
          alt={product.productName}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {product.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h6" component="div">
            ${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductItem;
