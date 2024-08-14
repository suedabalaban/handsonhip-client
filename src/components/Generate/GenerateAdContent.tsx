import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface Product {
    productID: number;
    productName: string;
    description: string;
    imageUrl: string;
    price: number;
}

interface GenerateAdContentProps {
  product: Product | null;
}

const GenerateAdContent: React.FC<GenerateAdContentProps> = ({ product }) => {
  if (!product) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>No product selected</Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="25vh"
      textAlign="center"
      gap={2} 
    >
      <Typography variant="h5">Generate Ad Content for:</Typography>
      <Typography variant="h6">{product.productName}</Typography>
      <Button variant="contained">Generate Content</Button>
    </Box>
  );
};

export default GenerateAdContent;
