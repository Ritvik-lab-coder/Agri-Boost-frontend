import React, { useEffect, useState } from 'react';
import '../CSS/Register.css';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import BASE_URL from '../utils/baseurl.js'

const EditProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const [age, setAge] = useState("");
    const [answer, setAnswer] = useState("");
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
                setAddress(response.data.user.address);
                setDob(response.data.user.dob);
                setAnswer(response.data.user.answer);
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
    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`${BASE_URL}/api/v1/user/edit-profile/${id}`, {
                firstName,
                lastName,
                email,
                phone,
                age,
                dob,
                address,
                answer
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                alert(response.data.message);
                getProfile();
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    return (
        <div className='container'>
            <form className='container-fluid m-3 p-3 form' onSubmit={handleUpdate}>
                <h2 className='form-title'>UPDATE PROFILE</h2>
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
                        <label className="form-label">Date of Birth</label>
                        <input type="date" className="form-control" value={dob} onChange={event => setDob(event.target.value)} />
                    </div>
                </div>
                <div className="mb-3 form-component">
                    <div>
                        <label className="form-label">Age</label>
                        <input type="text" className="form-control" value={age} onChange={event => setAge(event.target.value)} />
                    </div>
                    <div>
                        <label className="form-label">Phone No.</label>
                        <input type="text" className="form-control" value={phone} onChange={event => setPhone(event.target.value)} />
                    </div>
                </div>
                <div className="mb-3 form-component">
                    <div>
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" value={address} onChange={event => setAddress(event.target.value)} />
                    </div>
                    <div>
                        <label className="form-label">Favorite sport ?</label>
                        <input type="text" className="form-control" value={answer} onChange={event => setAnswer(event.target.value)} />
                    </div>
                </div>
                <div className="button">
                    <button type="submit" className="btn btn-primary">Edit</button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile
