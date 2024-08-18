import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import Sidebar from '../components/Sidebar'
import '../CSS/AdminUsers.css'
import axios from 'axios';
import BASE_URL from '../utils/baseurl.js'

const AdminUsers = () => {
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
    return (
        <div className='dashboard'>
            <div className='left-side'>
                <Sidebar />
            </div>
            <div className='right-side'>
                <Table striped bordered hover className='text-center' style={{ overflowY: "auto" }}>
                    <thead>
                        <tr>
                            <th className='users' colSpan={7}>All Users</th>
                        </tr>
                        <tr>
                            <th scope="col">Sr</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                            <th scope="col">Age</th>
                            <th scope="col">Registered as</th>
                        </tr>
                    </thead>
                    <tbody style={{ minHeight: "20vh" }}>
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
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default AdminUsers
