import * as React from 'react';
import ProductList from '../components/Products/ProductList';

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
  return (
    <div>
      <h1>Products</h1>
      <ProductList products={products} />
    </div>
  );
}
