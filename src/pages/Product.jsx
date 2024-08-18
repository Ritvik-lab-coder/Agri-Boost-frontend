import axios from 'axios';
import BASE_URL from '../utils/baseurl.js'
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../CSS/Product.css';

const Product = () => {
    const { id } = useParams();
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [rating, setRating] = useState(0);
    const [company, setCompany] = useState("");
    const [price, setPrice] = useState("");
    const [sellerName, setSellerName] = useState("");
    const [sellerEmail, setSellerEmail] = useState("");
    const [category, setCategory] = useState("");
    const getProduct = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/product/${id}`);
            if (response.data.success) {
                console.log(response.data.product);
                setName(response.data.product.name);
                setDescription(response.data.product.description);
                setCategory(response.data.product.category);
                setCompany(response.data.product.company);
                setPrice(response.data.product.price);
                setRating(response.data.product.rating);
                setSellerEmail(response.data.product.sellerEmail);
                setSellerName(response.data.product.sellerName);
                setImage(response.data.product.image.url);
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        getProduct();
        getReviews();
    }, []);
    const [userRating, setUserRating] = useState(5);
    const [review, setReview] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!localStorage.getItem('token')) {
            alert('Please login to leave us a review');
            navigate('/login');
        } else {
            try {
                const response = await axios.post(`${BASE_URL}/api/v1/user/review/${id}`, {
                    rating: userRating,
                    review
                }, {
                    headers: {
                        user_id: localStorage.getItem('id'),
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    alert("Thank you for your review");
                    setUserRating(5);
                    setReview("");
                    getProduct();
                    getReviews();
                }
            } catch (error) {
                console.log(error);
                alert(error.response.data.message);
            }
        }
    };
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const addProductToCart = async () => {
        if (!localStorage.getItem('token')) {
            alert("Please login to buy products");
            navigate('/login');
        } else {
            try {
                const response = await axios.post(`${BASE_URL}/api/v1/user/cart/${id}`, {
                    quantity
                }, {
                    headers: {
                        user_id: localStorage.getItem('id'),
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    alert(response.data.message);
                    getProduct();
                }
            } catch (error) {
                console.log(error);
                alert(error.response.data.message);
            }
        }
    };
    const [reviews, setReviews] = useState([]);
    const getReviews = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/reviews/${id}`);
            if (response.data.success) {
                setReviews(response.data.reviews);
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    return (
        <div className="container" style={{ height: "180vh" }}>
            <div className='product-container'>
                <div className='product-image'>
                    <img src={image} alt={name} style={{ height: "400px", width: "400px" }} />
                    <div className='buy'>
                        <div className="form-group">
                            <label style={{ fontSize: "20px" }}>Quantity</label>
                            <input type="number" placeholder='Quantity' value={quantity} onChange={event => setQuantity(event.target.value)} style={{ width: "150px", padding: "5px", marginLeft: "0" }} />
                        </div>
                        <button className='btn btn-primary' onClick={addProductToCart} style={{ margin: "10px auto", width: "150px", height: "70px", backgroundColor: "#546bed" }}>Buy</button>
                    </div>
                </div>
                <div className='product-details'>
                    <h2 className='product-name'>{name}</h2>
                    <p className='product-description'>{description}</p>
                    <p className='product-category'>Category: {category}</p>
                    <p className='product-company'>Company: {company}</p>
                    <p className='product-price'>Price: ₹{price}.00</p>
                    <p className='product-rating'>Rating: {rating.toFixed(1)} / 5</p>
                    <div className='seller-details'>
                        <h3>Seller Information</h3>
                        <p>Name: {sellerName}</p>
                        <p>Email: {sellerEmail}</p>
                    </div>
                </div>
            </div>
            <div id="carouselExampleInterval" className="carousel" data-bs-ride="carousel">
                <h3 className='title' style={{ marginTop: "20px" }}>See reviews</h3>
                {
                    reviews.length == 0 ? (<h3 className='title' style={{ marginTop: "20px" }}>No reviews available</h3>) : (
                        <div className="carousel-inner">
                            {reviews.map((review, index) => (
                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <div className="review-card">
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
                                            <img src="/images/defaultuser.jpg" alt="User Icon" style={{ width: "70px", borderRadius: "50%", marginRight: "5px" }} />
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <div className="user-name">{review.customerName}</div>
                                                <p>{review.rating} / 5</p>
                                            </div>
                                        </div>
                                        <div className="review-content">
                                            <div className="review-text">{review.review}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
            <div className="forms-container">
                <h3 className='title'>Leave a Review</h3>
                <form className='form' onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="rating">Rating:</label>
                        <input type="number" id="rating" placeholder='Rating' className='form-control' value={userRating} onChange={event => setUserRating(event.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="review">Review:</label>
                        <textarea id="review" placeholder='Leave a Review' className='form-control' style={{ resize: "none" }} value={review} onChange={event => setReview(event.target.value)}></textarea>
                    </div>
                    <button type="submit" className='btn btn-primary submit-button'>Submit</button>
                </form>
            </div>

        </div>
    );
};

export default Product;

