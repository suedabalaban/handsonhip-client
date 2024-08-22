import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';

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
  const [generatedContent, setGeneratedContent] = React.useState<string>('');

  const handleGenerateContent = async () => {
    if (!product) return;
    try {
      const response = await axios.post('http://localhost:8080/api/ai/generate', {
        prompt: product.description,
      });
      setGeneratedContent(response.data);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

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
      <Button variant="contained" onClick={handleGenerateContent}>Generate Content</Button>
      {generatedContent && (
        <Box mt={2}>
          <Typography variant="body1">{generatedContent}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default GenerateAdContent;
