import React, { useState, useEffect } from 'react';
import { ThemeProvider, Container, Box, Button } from '@mui/material';
import getPageTheme from 'src/theme/getPageTheme';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import ProductList from 'src/components/Product/ProductList';
import ProductEditForm from 'src/components/Product/ProductEditForm';
import AddProductForm from 'src/components/Product/AddProductForm';
import { useNavigate } from 'react-router-dom';

interface Product {
  productID: number;
  productName: string;
  description: string;
  imageUrl: string;
  price: number;
}

export default function ProductPage() {
  const [mode] = useState<PaletteMode>('light');
  const pageTheme = createTheme(getPageTheme(mode));
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/product', {
          withCredentials: true,
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
      if (!updatedProduct.productID) {
        console.error('Product ID is missing');
        return;
      }

      const response = await axios.put(`http://localhost:8080/api/product/${updatedProduct.productID}`, updatedProduct, {
        withCredentials: true,
      });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productID === updatedProduct.productID ? updatedProduct : product
        )
      );

      handleEditDialogClose();

      console.log('Product updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const handleSaveProductAdd = async (newProduct: { productName: string; description: string; imageUrl: string; price: number }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/product', newProduct, {
        withCredentials: true,
      });

      setProducts((prevProducts) => [...prevProducts, response.data]);

      handleAddDialogClose();

      console.log('Product added successfully:', response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  const handleDeleteProduct = async (productID: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/product/${productID}`, {
        withCredentials: true,
      });
  
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.productID !== productID)
      );
  
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const handleGenerateClick = (product: Product) => {
    navigate('/generate', { state: { product } });
  };
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  }
  return (
    <ThemeProvider theme={pageTheme}>
      <CssBaseline />
      <Container>
        <Box sx={{ padding: '20px' }}>
          <ProductList products={products} onEditClick={handleEditClick} onGenerateClick={handleGenerateClick} onSelectProduct={handleSelectProduct} showSelectButton={false}/>
        </Box>
        {selectedProduct && (
          <ProductEditForm
            open={editDialogOpen}
            product={selectedProduct}
            onClose={handleEditDialogClose}
            onSave={handleSaveProduct}
            onDelete={handleDeleteProduct}
          />
        )}
        <AddProductForm
          open={addDialogOpen}
          onClose={handleAddDialogClose}
          onSave={handleSaveProductAdd}
        />
        <Button
            variant="contained"
            color="primary"
            onClick={() => setAddDialogOpen(true)}
            sx={{ marginBottom: '20px' }}
          >
            Add Product
          </Button>
      </Container>
    </ThemeProvider>
  );
}
