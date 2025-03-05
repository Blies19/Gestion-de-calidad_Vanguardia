import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      {user && (
        <div>
          <p>Bienvenido, {user.name}!</p>
          <p>Rol: {user.role}</p>
        </div>
      )}
    </div>
  );
}