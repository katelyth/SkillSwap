import { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <>
    <Navbar/>
        <div className="max-w-md mx-auto mt-10 p-4 shadow rounded bg-white">
            <h2 className="text-xl font-semibold mb-4">Register</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    value={form.name}
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={handleChange}
                    value={form.email}
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={handleChange}
                    value={form.password}
                    required
                    className="w-full p-2 border rounded"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Sign Up
                </button>
            </form>
        </div>
    </>
  );
}
