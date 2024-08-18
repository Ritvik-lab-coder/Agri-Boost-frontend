import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Sidebar.css';

const SidebarFarmer = () => {
    const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
    const toggleAdminDropdown = () => {
        setIsAdminDropdownOpen(!isAdminDropdownOpen);
    };
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <img src="/images/navlogo.png" alt="Logo" className="sidebar-logo" />
                <h3>AgriBoost</h3>
            </div>
            <ul className="sidebar-nav">
                <li className="nav-items">
                    <Link className="nav-link" to='/farmer/dashboard'>Dashboard</Link>
                </li>
                <li className="nav-items">
                    <div className="dropdown">
                        <div className="nav-link dropdown-toggle" onClick={toggleAdminDropdown}>
                            Products
                        </div>
                        <ul className={`dropdown-menu ${isAdminDropdownOpen ? 'show' : ''}`}>
                            <li><Link className="dropdown-item" to='/farmer/products'>All Products</Link></li>
                            <li><Link className="dropdown-item" to='/farmer/add-product'>Add Product</Link></li>
                            <li><Link className="dropdown-item" to='/farmer/manage-product'>Manage Products</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-items">
                    <Link className="nav-link" to={`/farmer/review/${localStorage.getItem('id')}`}>Reviews</Link>
                </li>
            </ul>
        </div>
    );
};

export default SidebarFarmer;