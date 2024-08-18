import React, { useEffect, useState } from 'react'
import '../CSS/Cart.css'
import axios from 'axios'
import BASE_URL from '../utils/baseurl.js'

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [amount, setAmount] = useState(0);
    const getCartItems = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/user/cart`, {
                headers: {
                    user_id: localStorage.getItem('id'),
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                setCartItems(response.data.cartItems[0].products);
                setAmount(response.data.cartItems[0].amount);
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        getCartItems();
    });
    const deleteOneUnit = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/api/v1/user/cart/${id}`, {
                headers: {
                    user_id: localStorage.getItem('id'),
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                alert("Unit removed");
                getCartItems();
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    const deleteWholeProduct = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/api/v1/user/cart/delete/${id}`, {
                headers: {
                    user_id: localStorage.getItem('id'),
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                alert("Item removed");
                getCartItems();
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    return (
        <div className="cart-page">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Shopping Cart</h1>
                <h3>Total Cart Amount: ₹{amount}.00</h3>
            </div>
            {
                cartItems.length == 0 ? (<h1 style={{ textAlign: "center" }}>No items currently in cart</h1>) : (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {cartItems.map((item, index) => (<div key={index} className="cart-item-card">
                            <div className="image-container">
                                <img src={item.image} alt={item.name} style={{ height: "300px", width: "300px" }} />
                            </div>
                            <div className="item-details" style={{ marginLeft: "140px" }}>
                                <h2>{item.name}</h2>
                                <p style={{ fontSize: "20px" }}>Quantity: {item.quantity}</p>
                                <p style={{ fontSize: "20px" }}>Price: ₹{item.price}.00</p>
                                <p style={{ fontSize: "20px" }}>Total: ₹{item.price * item.quantity}.00</p>
                                <button className='btn btn-danger' onClick={() => deleteOneUnit(item.Id)} style={{ display: "block", marginTop: "10px" }}>Remove one unit</button>
                                <button className='btn btn-danger' onClick={() => deleteWholeProduct(item.Id)} style={{ display: "block", marginTop: "10px" }}>Remove all units</button>
                            </div>
                        </div>)
                        )}
                    </div>
                )
            }
        </div>

    )
}

export default Cart
