import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const correo = formData.get('correo');
    const contraseña = formData.get('contraseña');

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contraseña }),
      });
      const data = await response.json();
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (error) {
      console.error("Error de autenticación", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="correo" placeholder="Correo" required />
      <input type="password" name="contraseña" placeholder="Contraseña" required />
      <button type="submit">Ingresar</button>
    </form>
  );
}