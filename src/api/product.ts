const apiUrl: string = process.env.REACT_APP_API_URL || '';
const token = localStorage.getItem('token');

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${apiUrl}/product`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Attach token
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch products: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch products error:', error);
    throw error;
  }
};
export const fetchProductById = async (id: number) => {
  try {
    const response = await fetch(`${apiUrl}/product/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Attach token
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch product: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch product error:', error);
    throw error;
  }
};

export const createProduct = async (product: any) => {
  try {
    const response = await fetch(`${apiUrl}/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Attach token
      },
      body: JSON.stringify(product),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create product: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Create product error:', error);
    throw error;
  }
};

export const updateProduct = async (id: number, product: any) => {
  try {
    const response = await fetch(`${apiUrl}/product/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Attach token
      },
      body: JSON.stringify(product),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update product: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Update product error:', error);
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const response = await fetch(`${apiUrl}/product/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Attach token
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete product: ${errorText}`);
    }
  } catch (error) {
    console.error('Delete product error:', error);
    throw error;
  }
};
