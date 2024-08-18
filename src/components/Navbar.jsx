import React, { useEffect, useState } from 'react'
import '../CSS/Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();
    const checkLogin = () => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token) {
            setIsLoggedIn(true);
            setUserRole(role);
        }
    };
    useEffect(() => {
        checkLogin();
    }, [checkLogin]);
    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        setIsLoggedIn(false);
        navigate('/');
    };
    const [search, setSearch] = useState("");
    const handleSubmit = () => {
        console.log(search);
        navigate(`/search/${search}`);
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <img src="/images/navlogo.png" alt="" className='nav-logo' />
                <NavLink className="navbar-brand" to='/'>AgriBoost</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to='/'>HOME</NavLink>
                        </li>
                        {
                            isLoggedIn ? (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='/' onClick={handleLogOut}>LOGOUT</NavLink>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='/login'>LOGIN</NavLink>
                                </li>
                            )
                        }
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/register'>REGISTER</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/shop'>SHOP</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/about'>ABOUT</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/contact'>CONTACT</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/policy'>POLICY</NavLink>
                        </li>
                        {
                            isLoggedIn ? (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={`/profile/${localStorage.getItem('id')}`}>PROFILE</NavLink>
                                </li>
                            ) : (<></>)
                        }
                        {
                            isLoggedIn ? (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={`/cart`}>CART</NavLink>
                                </li>
                            ) : (<></>)
                        }
                        {
                            (isLoggedIn && userRole === '1') && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='/farmer/dashboard'>DASHBOARD</NavLink>
                                </li>
                            )
                        }
                        {
                            (isLoggedIn && userRole === '2') && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='/admin/dashboard'>DASHBOARD</NavLink>
                                </li>
                            )
                        }
                    </ul>
                    <form className="d-flex" role="search" onSubmit={handleSubmit}>
                        <input className="form-control me-2" type="text" placeholder="Search" aria-label="Search" value={search} onChange={event => setSearch(event.target.value)} />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>


    )
}

export default Navbar
