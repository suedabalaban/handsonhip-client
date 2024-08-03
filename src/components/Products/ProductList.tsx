import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import ProductItem from './ProductItem';

type Product = {
  id: number;
  productName: string;
  description: string;
  price: number;
  imageUrl: string;
};

// Props tipini tanımlayın
type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Grid container spacing={3}>
        {products && products.length > 0 ? (
          products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductItem product={product} onClick={() => handleProductClick(product)} />
            </Grid>
          ))
        ) : (
          <Typography>No products available.</Typography>
        )}
      </Grid>
      {selectedProduct && (
        <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '20px', backgroundColor: '#fff' }}>
          <Typography variant="h5">Selected Product</Typography>
          <Typography>Name: {selectedProduct.productName}</Typography>
          <Typography>Description: {selectedProduct.description}</Typography>
          <Typography>Price: {selectedProduct.price}</Typography>
          <img src={selectedProduct.imageUrl} alt={selectedProduct.productName} style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default ProductList;
