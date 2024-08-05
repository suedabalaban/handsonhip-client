import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login'; 
import ProductList from 'src/components/Product/ProductList';

const mockProducts = [
  {
    id: 1, 
    productName: 'Product 1',
    description: 'Description for product 1',
    price: 10.99,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    productName: 'Product 2',
    description: 'Description for product 2',
    price: 12.99,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    productName: 'Product 3',
    description: 'Description for product 3',
    price: 15.99,
    imageUrl: 'https://via.placeholder.com/150',
  },
];

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList products={mockProducts} />} />
      </Routes>
    </Router>
  );
};

export default App;
