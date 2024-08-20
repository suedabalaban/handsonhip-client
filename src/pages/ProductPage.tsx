import React, { useState, useEffect } from 'react';
import { ThemeProvider, Container, Box, Button, Typography } from '@mui/material';
import getPageTheme from 'src/theme/getPageTheme';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import ProductList from 'src/components/Product/ProductList';
import ProductEditForm from 'src/components/Product/ProductEditForm';
import AddProductForm from 'src/components/Product/AddProductForm';
import { useNavigate } from 'react-router-dom';
import { logout } from 'src/api/auth';

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
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token found
      return;
    }
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/product', {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${token}` // Include token in header
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login'); 
  };

  const handleSaveProduct = async (updatedProduct: Product) => {
    const token = localStorage.getItem('token');
    try {
      if (!updatedProduct.productID) {
        console.error('Product ID is missing');
        return;
      }

      const response = await axios.put(`http://localhost:8080/api/product/${updatedProduct.productID}`, updatedProduct, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}` // Include token in header
        }
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
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:8080/api/product', newProduct, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}` // Include token in header
        }
      });

      setProducts((prevProducts) => [...prevProducts, response.data]);

      handleAddDialogClose();

      console.log('Product added successfully:', response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (productID: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8080/api/product/${productID}`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}` // Include token in header
        }
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
  };

  return (
    <ThemeProvider theme={pageTheme}>
      <CssBaseline />
      <Container>
        <Box sx={{ padding: '20px 0' }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mr: 6
          }}>
            <Typography variant="h1">My Products</Typography>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center'
          }}>
            <Button
              variant="contained"
              color="info"
              onClick={() => setAddDialogOpen(true)}
              sx={{ color: '#ffffff', backgroundColor: '#c6a85a' }}
            >
              Add Product
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{ color: '#ffffff', backgroundColor: '#d15d6b' }}
            >
              Logout
            </Button>
          </Box>
        </Box>
        <Box sx={{ padding: '20px' }}>
          <ProductList
            products={products}
            onEditClick={handleEditClick}
            onGenerateClick={handleGenerateClick}
            onSelectProduct={handleSelectProduct}
            showSelectButton={false}
          />
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
      </Container>
    </ThemeProvider>
  );
}
