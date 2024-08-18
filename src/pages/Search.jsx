import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BASE_URL from '../utils/baseurl.js'
import { Row, Col } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import { Link, useParams } from 'react-router-dom'

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [company, setCompany] = useState("");
    const [sameCompany, setSameCompany] = useState([]);
    const { name } = useParams();
    const searchProducts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/search`, {
                headers: {
                    search: `${name}`
                }
            });
            if (response.data.success) {
                setSearchResults(response.data.searchProducts);
                setCompany(response.data.searchProducts[0].company);
                setSimilarProducts(response.data.similarProducts);
                setSameCompany(response.data.similarCompany);
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        searchProducts();
    }, []);
    return (
        <div>
            <div className="products-container">
                <Row>
                    <h1 style={{ textAlign: "center" }}>Search Results</h1>
                    {searchResults.length == 0 ? (<h1>No products found</h1>) : (
                        searchResults.map((product) => (
                            <Col md={2} className='mx-4' key={product.id}>
                                <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: 'black' }}><ProductCard product={product} /></Link>
                            </Col>
                        ))
                    )}
                </Row>
                <Row>
                    <h1 style={{ textAlign: "center" }}>Customers also bought</h1>
                    {similarProducts.length == 0 ? (<h1>No products found</h1>) : (
                        similarProducts.map((product) => (
                            <Col md={2} className='mx-4' key={product.id}>
                                <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: 'black' }}><ProductCard product={product} /></Link>
                            </Col>
                        ))
                    )}
                </Row>
                <Row>
                    <h1 style={{ textAlign: "center" }}>More from {company}</h1>
                    {sameCompany.length == 0 ? (<h1>No products found</h1>) : (
                        sameCompany.map((product) => (
                            <Col md={2} className='mx-4' key={product.id}>
                                <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: 'black' }}><ProductCard product={product} /></Link>
                            </Col>
                        ))
                    )}
                </Row>
            </div>
        </div>
    )
}

export default Search
