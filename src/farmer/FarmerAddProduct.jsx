import React, { useState } from 'react'
import SidebarFarmer from '../components/SidebarFarmer'
import '../CSS/FarmerAddProduct.css'
import axios from 'axios';
import BASE_URL from '../utils/baseurl.js'

const FarmerAddProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [company, setCompany] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");
    const handleImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(file);
            setPreview(reader.result);
        };
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('company', company);
            formData.append('category', category);
            formData.append('price', price);
            formData.append('image', image);
            const response = await axios.post(`${BASE_URL}/api/v1/farmer/`, formData, {
                headers: {
                    farmer_id: localStorage.getItem('id'),
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                alert("Product addedd successfully");
                setName("");
                setDescription("");
                setCategory("");
                setCompany("");
                setPreview("");
                setPrice(0);
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
            <div className='form-side'>
                <form className='forms' onSubmit={handleSubmit}>
                    <div className='mx-4 my-2 px-2 image-input'>
                        <img src={preview ? `${preview}` : `/images/default.png`} alt="" className='my-4' style={{ width: "400px" }} />
                        <input type="file" onChange={handleImage} />
                    </div>
                    <div style={{ margin: "auto 30px" }}>
                        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Add a New Product</h3>
                        <div className='form-component'>
                            <div>
                                <input type="text" placeholder='Name' value={name} onChange={event => setName(event.target.value)} />
                            </div>
                            <div>
                                <input type="text" placeholder='Description' value={description} onChange={event => setDescription(event.target.value)} />
                            </div>
                        </div>
                        <div className='form-component'>
                            <div>
                                <input type="text" placeholder='Company' value={company} onChange={event => setCompany(event.target.value)} />
                            </div>
                            <div>
                                <input type="number" placeholder='Price' value={price} onChange={event => setPrice(event.target.value)} />
                            </div>
                        </div>
                        <div className='form-component'>
                            <div>
                                <input type="text" placeholder='Category' value={category} onChange={event => setCategory(event.target.value)} />
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}><button className='btn btn-primary' type='submit'>Submit</button></div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FarmerAddProduct
