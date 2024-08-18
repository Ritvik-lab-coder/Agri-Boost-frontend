import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BASE_URL from '../utils/baseurl.js'
import { Row, Col } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        try {
            const resposne = await axios.get(`${BASE_URL}/api/v1/products`);
            if (resposne.data.success) {
                setProducts(resposne.data.products);
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        getProducts();
    }, [])
    return (
        <div>
            <div className="products-container">
                <Row>
                    {products.map((product) => (
                        <Col md={2} className='mx-4' key={product.id}>
                            <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: 'black' }}><ProductCard product={product} /></Link>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}

export default Shop
