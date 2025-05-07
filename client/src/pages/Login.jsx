import { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() { 

    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
        const res = await login(form);
        localStorage.setItem('token', res.data.token);
        navigate('/');
    } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
    }
    };

    return (
        <>
            <Navbar />
            <div className="max-w-md mx-auto mt-10 p-4 shadow rounded bg-white">
                <h2 className="text-xl font-semibold mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    Log In
                </button>
                </form>
            </div>
        </>
    );
}
