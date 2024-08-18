import React, { useState, useEffect } from 'react'
import axios from 'axios';
import BASE_URL from '../utils/baseurl.js'
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import '../CSS/FarmerProducts.css';
import '../CSS/AdminDashboard.css'
import { Row, Col } from 'react-bootstrap'

const AdminProducts = () => {
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
    return (
        <div className='dashboard'>
            <div className='left-side'>
                <Sidebar />
            </div>
            <div className='product-side'>
                <div className="products-container">
                    <Row>
                        {products.map((product) => (
                            <Col md={3} className='mx-4' key={product.id}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default AdminProducts
