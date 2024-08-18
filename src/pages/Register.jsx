import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../CSS/Register.css';
import axios from 'axios'
import BASE_URL from '../utils/baseurl.js'

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const [age, setAge] = useState("");
    const [answer, setAnswer] = useState("");
    const [role, setRole] = useState("Customer");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const roleParameter = role === "Customer" ? "user" : "farmer";
            const response = await axios.post(`${BASE_URL}/api/v1/${roleParameter}/register`, {
                firstName,
                lastName,
                email,
                password,
                dob,
                age,
                phone,
                address,
                answer
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
                <h2 className='form-title'>REGISTER NOW</h2>
                <div className="mb-3 form-component">
                    <div>
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" value={firstName} onChange={event => setFirstName(event.target.value)} />
                    </div>
                    <div>
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" value={lastName} onChange={event => setLastName(event.target.value)} />
                    </div>
                </div>
                <div className="mb-3 form-component">
                    <div>
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" value={email} onChange={event => setEmail(event.target.value)} />
                    </div>
                    <div>
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={event => setPassword(event.target.value)} />
                    </div>
                </div>
                <div className="mb-3 form-component">
                    <div>
                        <label className="form-label">Date of Birth</label>
                        <input type="date" className="form-control" value={dob} onChange={event => setDob(event.target.value)} />
                    </div>
                    <div>
                        <label className="form-label">Age</label>
                        <input type="text" className="form-control" value={age} onChange={event => setAge(event.target.value)} />
                    </div>
                </div>
                <div className="mb-3 form-component">
                    <div>
                        <label className="form-label">Phone No.</label>
                        <input type="text" className="form-control" value={phone} onChange={event => setPhone(event.target.value)} />
                    </div>
                    <div>
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" value={address} onChange={event => setAddress(event.target.value)} />
                    </div>
                </div>
                <div className="mb-3 form-component">
                    <div>
                        <label className="form-label">Favorite sport ?</label>
                        <input type="text" className="form-control" value={answer} onChange={event => setAnswer(event.target.value)} />
                    </div>
                    <div>
                        <label className="form-label">Register as </label>
                        <select className="form-select select" value={role} onChange={event => setRole(event.target.value)}>
                            <option key={0} value={"Customer"}>Customer</option>
                            <option key={1} value={"Farmer"}>Farmer</option>
                        </select>
                    </div>
                </div>
                <div className="button">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Register;

