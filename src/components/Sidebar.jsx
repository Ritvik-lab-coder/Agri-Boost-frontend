import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Sidebar.css';

const Sidebar = () => {
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };
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
                    <Link className="nav-link" to='/admin/dashboard'>Dashboard</Link>
                </li>
                <li className="nav-items">
                    <div className="dropdown">
                        <div className="nav-link dropdown-toggle" onClick={toggleUserDropdown}>
                            Users
                        </div>
                        <ul className={`dropdown-menu ${isUserDropdownOpen ? 'show' : ''}`}>
                            <li><Link className="dropdown-item" to='/admin/users'>All Users</Link></li>
                            <li><Link className="dropdown-item" to='/admin/users/manage'>Manage Users</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-items">
                    <div className="dropdown">
                        <div className="nav-link dropdown-toggle" onClick={toggleAdminDropdown}>
                            Products
                        </div>
                        <ul className={`dropdown-menu ${isAdminDropdownOpen ? 'show' : ''}`}>
                            <li><Link className="dropdown-item" to='/admin/products'>All Products</Link></li>
                            <li><Link className="dropdown-item" to='/admin/manage-products'>Manage Products</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-items">
                    <Link className="nav-link" to='/admin/messages'>Messages</Link>
                </li>
                <li className="nav-items">
                    <Link className="nav-link" to='/admin/register'>Register New Admin</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
