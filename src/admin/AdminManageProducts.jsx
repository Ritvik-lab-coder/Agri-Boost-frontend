import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios';
import BASE_URL from '../utils/baseurl.js'
import { Table } from 'react-bootstrap';

const AdminManageProducts = () => {
    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/admin/product`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                setProducts(response.data.products);
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        getProducts();
    }, []);
    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/api/v1/admin/delete-product/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                alert(response.data.message);
                getProducts();
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
                            <th colSpan={8} style={{ textAlign: "center", backgroundColor: "#56ab2f" }}>Manage Products</th>
                        </tr>
                        <tr>
                            <th scope='col'>Sr</th>
                            <th scope='col'>Product</th>
                            <th scope='col'>Description</th>
                            <th scope='col'>Price</th>
                            <th scope='col'>Category</th>
                            <th scope='col'>Company</th>
                            <th scope='col'>Rating</th>
                            <th scope='col'>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, index) => (
                                <tr>
                                    <td>{index + 1}.</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>₹{product.price}.00</td>
                                    <td>{product.category}</td>
                                    <td>{product.company}</td>
                                    <td>{product.rating}/5</td>
                                    <td>
                                        <button className='btn btn-danger mx-4' onClick={() => deleteProduct(product._id)}>Delete</button>
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

export default AdminManageProducts
