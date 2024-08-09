import * as React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Dialog, DialogContent } from '@mui/material';

interface Product {
  productID: number;
  productName: string;
  description: string;
  imageUrl: string;
  price: number;
}

interface ProductDetailsProps {
  product: Product | null;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [open, setOpen] = React.useState(false);

  if (!product) {
    return <Typography>No product selected</Typography>;
  }

  const handleImageClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          height="250"
          image={product.imageUrl}
          alt={product.productName}
          onClick={handleImageClick}
          sx={{
            cursor: 'pointer',
            objectFit: 'cover',
            filter: 'brightness(90%)', // Daha belirgin hale getirmek için bir filtre ekleyebilirsiniz
            '&:hover': {
              filter: 'brightness(100%)',
            },
          }}
        />
        <CardContent>
          <Typography variant="h5">{product.productName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h6">${product.price}</Typography>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <img
            src={product.imageUrl}
            alt={product.productName}
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '600px', 
              maxHeight: '80vh', 
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductDetails;
