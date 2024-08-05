const apiUrl: string = process.env.REACT_APP_API_URL || '';

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    console.log('Login successful:', data);
  } catch (error) {
    console.error('Login error:', error);
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${apiUrl}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    console.log('Logged out successfully');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const register = async (user: { email: string; password: string; firstName: string; lastName: string; address: string; country: string; city: string; }) => {
  try {
    const response = await fetch(`${apiUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return await response.text();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};


export const status = async (sessionId: number) => {
  try {
    const response = await fetch(`${apiUrl}/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) {
      throw new Error('Status check failed');
    }

    return await response.text();
  } catch (error) {
    console.error('Status check error:', error);
    throw error;
  }
};
