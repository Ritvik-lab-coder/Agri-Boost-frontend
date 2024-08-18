import React, { useState } from 'react'
import { Container, Row, Col, Table, Image } from 'react-bootstrap'
import { FaPhoneVolume, FaLocationDot } from "react-icons/fa6";
import { FaHeadphonesAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from 'axios';
import BASE_URL from '../utils/baseurl.js'

const Contact = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/send-message`, {
                firstName,
                lastName,
                email,
                phone,
                message
            });
            if (response.data.success) {
                alert(response.data.message);
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhone("");
                setMessage("");
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    return (
        <>
            <div className='mx-4 my-4'>
                <Row>
                    <Col md={6}>
                        <h1>Contact Us for more details</h1>
                        <p>Send an email, call on the tollfree helpline or write to us. Helpline services are available 24/7.</p>
                        <Table striped bordered hover className='text-center'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className='text-center' colSpan={3} style={{ backgroundColor: "#56ab2f" }}>
                                            Contact Details
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><FaPhoneVolume /></td>
                                        <td>Phone</td>
                                        <td>+91-7847384924</td>
                                    </tr>
                                    <tr>
                                        <td><FaHeadphonesAlt /></td>
                                        <td>Helpline</td>
                                        <td>1800-473-374</td>
                                    </tr>
                                    <tr>
                                        <td><MdEmail /></td>
                                        <td>Email</td>
                                        <td>agriboost@industry.ac.in</td>
                                    </tr>
                                    <tr>
                                        <td><FaLocationDot /></td>
                                        <td>Head Office</td>
                                        <td>Mumbai, India</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Table>
                    </Col>
                    <Col md={6}>
                        <form className='container-fluid m-3 p-3 form' onSubmit={handleSubmit}>
                            <h2 className='form-title'>Send us a message</h2>
                            <div className="mb-3 form-component">
                                <div>
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form-control" value={firstName} onChange={event => setFirstName(event.target.value)} />
                                </div>
                                <div>
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form-control" value={lastName} onChange={event => setLastName(event.target.value)} />
                                </div>
                            </div>
                            <div className="mb-3 form-component">
                                <div>
                                    <label className="form-label">Email address</label>
                                    <input type="email" className="form-control" value={email} onChange={event => setEmail(event.target.value)} />
                                </div>
                                <div>
                                    <label className="form-label">Phone</label>
                                    <input type="text" className="form-control" value={phone} onChange={event => setPhone(event.target.value)} />
                                </div>
                            </div>
                            <div className="mb-3 form-component">
                                <div>
                                    <lable className="form-label">Message</lable>
                                    <textarea className='form-control' value={message} onChange={event => setMessage(event.target.value)} style={{ resize: "none" }}></textarea>
                                </div>
                            </div>
                            <div className="button">
                                <button type="submit" className="btn btn-primary">Send</button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Contact
