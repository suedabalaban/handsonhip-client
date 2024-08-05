import React, { useState } from 'react';
import { Grid, Dialog, Paper, Typography } from '@mui/material';
import ProductItem from './ProductItem';
import ProductEditForm from 'src/components/Product/ProductEditForm';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleProductSave = (updatedProduct: Product) => {
    // Ürün güncelleme işlemi burada yapılabilir
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Grid container spacing={3}>
      {products && products.length > 0 ? (
        products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Paper elevation={3}>
              <ProductItem product={product} onClick={() => handleProductClick(product)} />
            </Paper>
          </Grid>
        ))
      ) : (
        <Typography variant="h6">No products available.</Typography>
      )}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        {selectedProduct && (
          <ProductEditForm
            open={isDialogOpen}
            product={selectedProduct}
            onClose={handleDialogClose}
            onSave={handleProductSave}
          />
        )}
      </Dialog>
    </Grid>
  );
};

export default ProductList;