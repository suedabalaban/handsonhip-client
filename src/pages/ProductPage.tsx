import React, { useState, useEffect } from 'react';
import { ThemeProvider, Container, Box } from '@mui/material';
import getPageTheme from 'src/theme/getPageTheme';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import ProductList from 'src/components/Product/ProductList';
import ProductEditForm from 'src/components/Product/ProductEditForm';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

export default function ProductsPage() {
  const [mode] = useState<PaletteMode>('light');
  const pageTheme = createTheme(getPageTheme(mode));
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/product', {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveProduct = async (updatedProduct: Product) => {
    try {
      if (!updatedProduct.id) {
        console.error('Product ID is missing');
        return;
      }

      const response = await axios.put(`http://localhost:8080/api/product/${updatedProduct.id}`, updatedProduct, {
        withCredentials: true,
      });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );

      handleEditDialogClose();

      console.log('Product updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <ThemeProvider theme={pageTheme}>
      <CssBaseline />
      <Container>
        <Box sx={{ padding: '20px' }}>
          <ProductList products={products} onEditClick={handleEditClick} />
        </Box>
        {selectedProduct && (
          <ProductEditForm
            open={editDialogOpen}
            product={selectedProduct}
            onClose={handleEditDialogClose}
            onSave={handleSaveProduct}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}
