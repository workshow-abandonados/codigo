document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registroForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const body = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      city: formData.get('city')
    };

    try {
      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Error al registrar');
        return;
      }

      localStorage.setItem('token', data.token);
      window.location.href = '/cliente-app/inicio-cliente.html';
    } catch (err) {
      console.error(err);
      alert('Error de conexión');
    }
  });
});
