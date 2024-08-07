import React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Box, Button } from '@mui/material';

interface Product {
  productID: number;
  productName: string;
  description: string;
  imageUrl: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
  onEditClick: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEditClick }) => {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item key={product.productID} xs={12} sm={6} md={4}>
          <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="160"
                image={product.imageUrl}
                alt={product.productName}
                sx={{ objectFit: 'cover' }}
              />
            </Box>
            <CardContent
              sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                padding: '12px',
                '&:last-child': { paddingBottom: '12px' }
              }}
            >
              <Typography
                variant="h6"
                sx={{ marginBottom: '4px' }}
              >
                {product.productName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                  lineHeight: '1.2em',
                  height: '2.4em',
                  marginBottom: '8px'
                }}
              >
                {product.description}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                ${Number(product.price).toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 'auto' }}
                onClick={() => onEditClick(product)}
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
