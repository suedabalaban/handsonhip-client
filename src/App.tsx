import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignInSide';
import ProductPage from './pages/ProductPage';
import Generate from './pages/Generate'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path ="/generate" element = {<Generate />} />
      </Routes>
    </Router>
  );
};

export default App;
