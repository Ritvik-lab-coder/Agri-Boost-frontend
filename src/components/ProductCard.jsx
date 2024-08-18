import React from 'react'
import { Row, Col } from 'react-bootstrap'
import '../CSS/ProductCard.css'

const ProductCard = ({ product }) => {
    return (
        <div>
            <div className="product-card">
                <img src={product.image.url} className="product-image" alt={product.name} />
                <div className="product-body">
                    <h3 className="product-title">{product.name}</h3>
                    <hr />
                    <Row className="product-options">
                        <Col md={6} className="product-option">
                            <h4>Product</h4>
                            <p>{product.name}</p>
                        </Col>
                        <Col md={6} className="product-option">
                            <h4>Company</h4>
                            <p>{product.company}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className="product-option">
                            <h4>Description</h4>
                            <p>{product.description}</p>
                        </Col>
                    </Row>
                    <Row className="product-price-cart">
                        <Col md={6} className="product-option">
                            <h4>Rating</h4>
                            <p>{product.rating.toFixed(1)}/5</p>
                        </Col>
                        <Col md={6} className="product-option">
                            <h4>Price</h4>
                            <p>₹{product.price}.00</p>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
