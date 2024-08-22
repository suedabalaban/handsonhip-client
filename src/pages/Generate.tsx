import React, { useState, useEffect } from 'react';
import { Grid, Button, Box, Typography, Stepper, Step, StepLabel, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ProductList from 'src/components/Product/ProductList';
import ProductDetails from 'src/components/Product/ProductDetails';
import GenerateAdContent from 'src/components/Generate/GenerateAdContent';
import getPageTheme from 'src/theme/getPageTheme';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Product {
  productID: number;
  productName: string;
  description: string;
  imageUrl: string;
  price: number;
}

const steps = ['Select Product', 'View Product Details', 'Generate Ad Content'];

export default function Generate() {
  const [mode] = useState<'light' | 'dark'>('light');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const generateTheme = createTheme(getPageTheme(mode));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/product', { 
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${token}` // Include token in header
          } });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleNext = () => {
    if (activeStep === 0 && !selectedProduct) {
      alert('Please select a product');
      return;
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveStep(1);
  };

  const handleGenerateClick = (product: Product) => {
    navigate('/generate', { state: { product } });
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <ProductList
            products={products}
            onEditClick={() => {}}
            showEditButton={false}
            onGenerateClick={handleGenerateClick}
            showGenerateButton={false}
            onSelectProduct={handleSelectProduct}
          />
        );
      case 1:
        return <ProductDetails product={selectedProduct} />;
      case 2:
        return <GenerateAdContent product={selectedProduct} />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <ThemeProvider theme={generateTheme}>
      <CssBaseline />
      <Grid container sx={{ height: '100vh' }}>
        <Grid item xs={12} sm={5} lg={4} sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'background.paper', borderRight: '1px solid', borderColor: 'divider', alignItems: 'start', pt: 4, px: 6, gap: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'end', height: 120, mb: 4 }}>
            <Button startIcon={<ArrowBackRoundedIcon />} component="a" href="/products" sx={{ ml: '-8px' }}>
              Back to Products
            </Button>
          </Box>
          <Typography variant="h2" sx={{ ml: 2 }}>Generate Marketing Content</Typography>
          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              This generate page allows you to select a product, view its details, and generate marketing content using AI. Follow the steps to complete the process.
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={12} md={7} lg={8} sx={{ display: 'flex', flexDirection: 'column', maxWidth: '100%', width: '100%', backgroundColor: 'background.default', alignItems: 'start', pt: { xs: 2, sm: 4 }, px: { xs: 2, sm: 6 }, gap: { xs: 4, md: 8 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: { sm: '100%', md: 600 } }}>
            <Stepper activeStep={activeStep} sx={{ width: '100%', height: 40 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', maxWidth: { sm: '100%', md: 600 }, maxHeight: '720px', gap: { xs: 5, md: 'none' } }}>
            {activeStep === steps.length ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography variant="h1">📦</Typography>
                <Typography variant="h5">You can find your updated item in your products!</Typography>
                <Button href="/products" variant="contained" sx={{ mt: 2 }}>Go to my products</Button>
              </Box>
            ) : (
              <>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', sm: 'row' }, justifyContent: activeStep !== 0 ? 'space-between' : 'flex-end', alignItems: 'end', flexGrow: 1, gap: 1, pb: { xs: 12, sm: 0 }, mt: { xs: 2, sm: 0 }, mb: '60px' , position: 'absolute', bottom: 50, right: 0, padding: '20px'}}>
                  {activeStep !== 0 && (
                    <Button startIcon={<ChevronLeftRoundedIcon />} onClick={handleBack} variant="text" sx={{ display: { xs: 'none', sm: 'flex' } }}>Previous</Button>
                  )}
                  {activeStep !== 0 && (
                    <Button startIcon={<ChevronLeftRoundedIcon />} onClick={handleBack} variant="outlined" fullWidth sx={{ display: { xs: 'flex', sm: 'none' } }}>Previous</Button>
                  )}
                  {activeStep !== 0 && (
                    <Button variant="contained" endIcon={<ChevronRightRoundedIcon />} onClick={handleNext} sx={{ width: { xs: '100%', sm: 'fit-content' } }}>
                      {activeStep === steps.length - 1 ? 'Complete' : 'Next'}
                    </Button>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
