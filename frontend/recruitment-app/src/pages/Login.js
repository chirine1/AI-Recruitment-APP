import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../Components/Layout';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== '' && localStorage.getItem('token') !== null) {
            navigate('/dashboard');
        }
    }, []);

    const loginAction = (e) => {
        setValidationErrors({});
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            email: email,
            password: password,
        };

        axios
            .post('/auth/login', payload)
            .then((r) => {
                setIsSubmitting(false);
                localStorage.setItem('token', r.data.token);
                navigate('/dashboard');
            })
            .catch((e) => {
                setIsSubmitting(false);
                if (e.response.data.errors !== undefined) {
                    setValidationErrors(e.response.data.errors);
                }
                if (e.response.data.error !== undefined) {
                    setValidationErrors(e.response.data.error);
                }
            });
    };

    return (
        <Layout>
            <div className="min-h-screen flex justify-center items-center">
                <div className="w-full max-w-md">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-8 text-center">Sign In</h2>
                        <form onSubmit={(e) => loginAction(e)}>
                            {Object.keys(validationErrors).length !== 0 && (
                                <p className="text-center ">
                                    <small className="text-red-500">Incorrect Email or Password</small>
                                </p>
                            )}

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="mt-1 p-2 w-full border rounded-md"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="mt-1 p-2 w-full border rounded-md"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        id="rememberMe"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <label htmlFor="rememberMe" className="text-sm text-gray-600">
                                        Remember me
                                    </label>
                                </div>
                                <div>
                                    <Link to="/forgot-password" className="text-sm text-blue-500">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                            >
                                {isSubmitting ? 'Loading...' : 'Login'}
                            </button>
                        </form>
                        <p className="text-center mt-4">
                            Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Login;
