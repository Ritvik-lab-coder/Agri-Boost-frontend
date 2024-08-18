import React, { useEffect, useState } from 'react'
import '../CSS/AdminDashboard.css'
import '../CSS/AdminUsers.css'
import SidebarFarmer from '../components/SidebarFarmer'
import { Table } from 'react-bootstrap'
import axios from 'axios';
import BASE_URL from '../utils/baseurl.js'
import { useParams } from 'react-router-dom'

const FarmerReviews = () => {
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const getReviews = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/farmer/review/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                setReviews(response.data.review);
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        getReviews();
    }, []);
    const deleteReview = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/v1/farmer/review/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                alert(response.data.message);
                getReviews();
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    return (
        <div className='dashboard'>
            <div className='left-side'>
                <SidebarFarmer />
            </div>
            <div className='right-side'>
                <Table striped bordered hover className='text-center' style={{ overflowY: "auto" }}>
                    <thead>
                        <tr>
                            <th className='users' colSpan={7}>All Reviews</th>
                        </tr>
                        <tr>
                            <th scope="col">Sr</th>
                            <th scope="col">Sender</th>
                            <th scope="col">Email</th>
                            <th scope="col">Product</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Review</th>
                            <th scope="col">Reply</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviews.map((review, index) => (
                                <tr>
                                    <td>{index + 1}.</td>
                                    <td>{review.customerName}</td>
                                    <td>{review.customerEmail}</td>
                                    <td>{review.productName}</td>
                                    <td>{review.rating}/5</td>
                                    <td>{review.review}</td>
                                    <td>
                                        <button className='btn btn-danger mx-4' onClick={() => deleteReview(review._id)}>Delete</button>
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

export default FarmerReviews