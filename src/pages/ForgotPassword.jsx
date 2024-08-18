import React, { useState } from 'react'
import '../CSS/Login.css'
import axios from 'axios';
import BASE_URL from '../utils/baseurl.js'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`${BASE_URL}/api/v1/forgot-password`, {
                email,
                answer,
                newPassword: password
            });
            if (response.data.success) {
                alert(response.data.message);
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    return (
        <div className='container'>
            <form className='container-fluid m-3 p-3 form' onSubmit={handleSubmit}>
                <h2 className='form-title'>CHANGE PASSWORD</h2>
                <div className="mb-3 form-component">
                    <div>
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" value={email} onChange={event => setEmail(event.target.value)} />
                    </div>
                    <div>
                        <label className="form-label">Your favorite sport ?</label>
                        <input type="text" className="form-control" value={answer} onChange={event => setAnswer(event.target.value)} />
                    </div>
                </div>
                <div className="mb-3 form-component">
                    <div>
                        <label className="form-label">New Password</label>
                        <input type="password" className="form-control" value={password} onChange={event => setPassword(event.target.value)} />
                    </div>
                </div>
                <div className="button">
                    <button type="submit" className="btn btn-primary">Change Password</button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword
