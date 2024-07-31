const apiUrl = process.env.REACT_APP_API_URL;

export const login = async (email: string, password: string) => {
  try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
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
      // Gerekli işlemleri burada yapın
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
