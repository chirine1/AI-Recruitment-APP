import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/users/me', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('access_token')
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        if (!localStorage.getItem('access_token')) {
            navigate("/");
        } else {
            fetchUser();
        }
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.get('/auth/logout', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token')
                }
            });
            localStorage.removeItem('access_token');
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <Layout>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Dashboard</a>
                            <div className="d-flex">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <button onClick={handleLogout} className="btn btn-link nav-link">Logout</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className="text-center mt-5">
                        <h2>Welcome, {user.name}!</h2>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default Dashboard;
