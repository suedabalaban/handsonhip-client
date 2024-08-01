import React from 'react';
import { logout } from '../api/auth'; // auth.ts dosyasındaki logout fonksiyonunu içe aktarıyoruz

const Home: React.FC = () => {
  const handleLogout = async () => {
    try {
      await logout(); // logout fonksiyonunu çağırıyoruz
      window.location.href = '/login'; // Logout sonrası login sayfasına yönlendirme
    } catch (error) {
      console.error('Logout failed', error); // Hata durumunda konsola yazdırma
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Logout</button> {/* Logout butonu */}
    </div>
  );
};

export default Home;
