import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddProductForm() {
  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="product-name" required>
          Product Name
        </FormLabel>
        <OutlinedInput
          id="product-name"
          name="product-name"
          type="text"
          placeholder="Product Name"
          autoComplete="product-name"
          required
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="product-category" required>
          Product Category
        </FormLabel>
        <OutlinedInput
          id="product-category"
          name="product-category"
          type="text"
          placeholder="Product Category"
          autoComplete="product-category"
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="product-description" required>
          Product Description
        </FormLabel>
        <OutlinedInput
          id="product-description"
          name="product-description"
          type="text"
          placeholder="Product Description"
          autoComplete="product-description"
          required
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="price" required>
          Price
        </FormLabel>
        <OutlinedInput
          id="price"
          name="price"
          type="number"
          placeholder="Price"
          autoComplete="price"
          required
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="stock" required>
          Stock
        </FormLabel>
        <OutlinedInput
          id="stock"
          name="stock"
          type="number"
          placeholder="Stock"
          autoComplete="stock"
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormControlLabel
          control={<Checkbox name="available" value="yes" />}
          label="Available"
        />
      </FormGrid>
    </Grid>
  );
}
