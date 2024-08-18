import React, { useEffect, useState } from 'react'
import '../CSS/Profile.css'
import axios from 'axios';
import BASE_URL from '../utils/baseurl.js'
import { Link, useParams } from 'react-router-dom';

const Profile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const [age, setAge] = useState("");
    const { id } = useParams();
    const getProfile = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/user/me/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                setFirstName(response.data.user.firstName);
                setLastName(response.data.user.lastName);
                setEmail(response.data.user.email);
                setPhone(response.data.user.phone);
                setDob(response.data.user.dob);
                setAddress(response.data.user.address);
                setAge(response.data.user.age);
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        getProfile();
    }, []);
    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2 className="profile-name">Name: {firstName} {lastName}</h2>
                <h2 className="profile-email">Email: {email}</h2>
                <h2 className="profile-phone">Phone: +91-{phone}</h2>
                <h2 className="profile-address">Address: {address}</h2>
                <h2 className="profile-address">Date of Birth: {dob.slice(0, 10)}</h2>
                <h2 className="profile-address">Age: {age}</h2>
                <button variant="primary" className="edit-profile-button"><Link to={`/edit-profile/${id}`} style={{ textDecoration: "none", color: "white" }}>Edit Profile</Link></button>
            </div>
        </div>
    )
}

export default Profile
