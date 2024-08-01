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

export const register = async (email: string, password: string) => {
    const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        return await response.text();
    } else {
        throw new Error('Registration failed');
    }
};

export const status = async (sessionId: number) => {
    const response = await fetch(`${apiUrl}/status`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
    });

    if (response.ok) {
        return await response.text();
    } else {
        throw new Error('Status check failed');
    }
};
