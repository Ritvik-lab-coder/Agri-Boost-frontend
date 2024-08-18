import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import '../CSS/AdminUsers.css'
import axios from 'axios';
import BASE_URL from '../utils/baseurl.js'
import { Table } from 'react-bootstrap'

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const getMessages = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/admin/messages`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                setMessages(response.data.messages);
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        getMessages();
    }, []);
    const deleteMessage = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/api/v1/admin/delete-message/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                alert(response.data.message);
                getMessages();
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
                            <th className='users' colSpan={6}>All Messages</th>
                        </tr>
                        <tr>
                            <th scope="col">Sr</th>
                            <th scope="col">Sender</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Message</th>
                            <th scope="col">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            messages.map((message, index) => (
                                <tr>
                                    <td>{index + 1}.</td>
                                    <td>{message.firstName} {message.lastName}</td>
                                    <td>{message.email}</td>
                                    <td>{message.phone}</td>
                                    <td>{message.message}</td>
                                    <td>
                                        <button className='btn btn-danger mx-4' onClick={() => deleteMessage(message._id)}>Delete</button>
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

export default AdminMessages
