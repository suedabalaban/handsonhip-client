import * as React from 'react';
import { ThemeProvider, Container, Box } from '@mui/material';
import ProductList from '../components/Products/ProductList';
import getPageTheme from '@/theme/getPageTheme';  
import {PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';

const products = [
  {
    id: 1,
    productName: 'Product 1',
    description: 'This is the description for product 1',
    imageUrl: 'https://via.placeholder.com/150',
    price: 10.99,
  },
  {
    id: 2,
    productName: 'Product 2',
    description: 'This is the description for product 2',
    imageUrl: 'https://via.placeholder.com/150',
    price: 12.99,
  },
];

export default function ProductsPage() {
  const [mode] = React.useState<PaletteMode>('light');
  const pageTheme = createTheme(getPageTheme(mode));
  return (
    <ThemeProvider theme={pageTheme}>
      <CssBaseline />
      <Container>
        <Box sx={{ padding: '20px' }}>
          <ProductList products={products} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}