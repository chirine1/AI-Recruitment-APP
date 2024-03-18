import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../Components/Layout';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/auth/login', { email, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/dashboard');
        } catch (error) {
            setLoading(false);
            if (error.response) {
                // API response error
                setError(error.response.data.detail);
            } else if (error.request) {
                // Request error
                setError('An error occurred while logging in. Please try again.');
            } else {
                // Other error
                setError('An error occurred. Please try again.');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <Layout>
            <div className="row justify-content-center mt-5">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Login</h5>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Loading...' : 'Login'}
                                </button>
                            </form>
                            <p className="mt-3 mb-0 text-center">Don't have an account? <Link to="/register">Sign up here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center mt-3">
                <div className="col-md-4">
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </Layout>
    );
}

export default Login;
