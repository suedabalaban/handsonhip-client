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
    return <Typography>No product selected</Typography>;
  }

  // Örnek olarak sabit bir içerik gösterebiliriz. Burada reklam içeriğini dinamik olarak oluşturabilirsiniz.
  return (
    <Box>
      <Typography variant="h6">Generate Ad Content for:</Typography>
      <Typography variant="h5">{product.productName}</Typography>
      <Button variant="contained">Generate Content</Button>
    </Box>
  );
};

export default GenerateAdContent;
