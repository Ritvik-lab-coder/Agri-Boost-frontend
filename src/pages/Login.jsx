import React, { useState } from 'react'
import '../CSS/Login.css'
import axios from 'axios';
import BASE_URL from '../utils/baseurl.js'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/login`, {
                email,
                password
            });
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.user.role);
                localStorage.setItem('id', response.data.user.id);
                alert(response.data.message);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    return (
        <div className='container'>
            <form className='container-fluid m-3 p-3 form' onSubmit={handleSubmit}>
                <h2 className='form-title'>LOGIN NOW</h2>
                <div className="mb-3 form-component">
                    <div>
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" value={email} onChange={event => setEmail(event.target.value)} />
                    </div>
                </div>
                <div className="mb-3 form-component">
                    <div>
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={event => setPassword(event.target.value)} />
                    </div>
                </div>
                <div className="button">
                    <button type="submit" className="btn btn-primary">Login</button>
                    <button type="submit" className="btn btn-primary mx-4"><Link to={'/forgot-password'} style={{ textDecoration: "none", color: "white" }}>Forgot Password</Link></button>
                </div>
            </form>
        </div>
    )
}

export default Login
