import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import '../CSS/AdminUsers.css'
import axios from 'axios';
import BASE_URL from '../utils/baseurl.js'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const AdminUserManage = () => {
    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/admin/users`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                setUsers(response.data.users);
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        getUsers();
    }, []);
    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/api/v1/admin/delete/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                alert(response.data.message);
                getUsers();
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    return (
        <div className='dashboard'>
            <div className='left-side'>
                <Sidebar />
            </div>
            <div className='right-side'>
                <Table striped bordered hover className='text-center' style={{ overflowY: "auto" }}>
                    <thead>
                        <tr>
                            <th className='users' colSpan={8}>Manage Users</th>
                        </tr>
                        <tr>
                            <th scope="col">Sr</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                            <th scope="col">Age</th>
                            <th scope="col">Registered as</th>
                            <th scope="col">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr>
                                    <td>{index + 1}.</td>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td>{user.age}</td>
                                    <td>{user.role === "0" ? "Customer" : user.role === "1" ? "Farmer" : "Admin"}</td>
                                    <td>
                                        <Link to={`/edit-user/${user._id}`} style={{ textDecoration: "none" }}>Edit</Link>
                                        <button className='btn btn-danger mx-4' onClick={() => deleteUser(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default AdminUserManage