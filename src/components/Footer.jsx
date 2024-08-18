import React from 'react'
import '../CSS/Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>We provide fresh and organic produce directly from the farm to your doorstep.</p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/shop'>Shop</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>Email: support@organicshop.com</p>
                    <p>Phone: +123 456 7890</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Organic Shop. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
