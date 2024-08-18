import React, { useEffect, useState } from 'react'
import '../CSS/Home.css'
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import BASE_URL from '../utils/baseurl.js'

const Home = () => {
    const [vegetables, setVegetables] = useState([]);
    const [fruits, setFruits] = useState([]);
    const [fertilizers, setFertilizers] = useState([]);
    const getVegetables = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/search`, {
                headers: {
                    search: "vegetables"
                }
            });
            if (response.data.success) {
                setVegetables(response.data.searchProducts.slice(0, 5));
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    const getFruits = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/search`, {
                headers: {
                    search: "fruits"
                }
            });
            if (response.data.success) {
                setFruits(response.data.searchProducts.slice(0, 5));
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    const getFertilizers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/search`, {
                headers: {
                    search: "fertilizers"
                }
            });
            if (response.data.success) {
                setFertilizers(response.data.searchProducts.slice(0, 5));
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        getVegetables();
        getFruits();
        getFertilizers();
    }, []);
    return (
        <div className='mx-4 my-4'>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div className="content">
                    <h2 style={{ fontSize: "80px", textAlign: "center" }}>Welcome to <span style={{ color: "yellowgreen" }}>AgriBoost</span></h2>
                    <div style={{ width: "850px" }}>
                        <h3>Welcome to AgriBoost</h3>
                        <h4>Your One-Stop Shop for Fresh and Sustainable Agricultural Products</h4>
                        <h5>At AgriBoost, we bring the farm to your doorstep. Our mission is to connect farmers directly with consumers, ensuring that you get the freshest produce and products while supporting sustainable agricultural practices. We prioritize freshness and quality. By connecting you directly with farmers, we ensure that every product you purchase is fresh and of the highest quality. Support sustainability with every purchase. Our farmers use eco-friendly practices that protect the environment and promote the health of our planet. We believe in fair trade. By eliminating middlemen, we ensure that farmers receive fair compensation for their hard work, while you enjoy competitive prices.</h5>
                        <h5>Sourced directly from local farmers, our fruits and vegetables are picked at peak ripeness for maximum flavor and nutrition. Enjoy milk, cheese, and yogurt from farms committed to organic and sustainable practices. Find a variety of grains and pulses, perfect for wholesome and healthy meals.</h5>
                    </div>
                </div>
                <div className="image">
                    <img src="/images/farmer.png" alt="" className='animated-image' />
                </div>
            </div>
            <h2 style={{ textAlign: "center" }}>See our prodoucts</h2>
            <div className="vegetables">
                <h2 style={{ textAlign: "center", fontSize: "50px" }}> Buy Fresh <span style={{ color: "yellowgreen" }}>Vegetables</span></h2>
                <div className="products-container">
                    <Row>
                        {vegetables.map((product) => (
                            <Col md={2} className='mx-4' key={product.id}>
                                <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: 'black' }}><ProductCard product={product} /></Link>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            <div className="fruits">
                <h2 style={{ textAlign: "center", fontSize: "50px" }}> Explore Farm Fresh <span style={{ color: "yellowgreen" }}>Fruits</span></h2>
                <div className="products-container">
                    <Row>
                        {fruits.map((product) => (
                            <Col md={2} className='mx-4' key={product.id}>
                                <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: 'black' }}><ProductCard product={product} /></Link>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            <div className="fertilizers">
                <h2 style={{ textAlign: "center", fontSize: "50px" }}> We Also Offer <span style={{ color: "yellowgreen" }}>Fertilizers</span></h2>
                <div className="products-container">
                    <Row>
                        {fertilizers.map((product) => (
                            <Col md={2} className='mx-4' key={product.id}>
                                <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: 'black' }}><ProductCard product={product} /></Link>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            <h2 style={{ fontSize: "50px", textAlign: "center" }}>Want to Browse more products ?</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button className='btn btn-primary'><Link to={'/shop'} style={{ textDecoration: "none", color: "white" }}>Go to Shop</Link></button>
            </div>
        </div>
    )
}

export default Home
